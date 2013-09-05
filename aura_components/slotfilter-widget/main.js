/*
non visual widget for filtering slot by tofind
*/
define(['backbone'], function(Backbone) {
  return {
    filter:function() {
    	var db=this.model.get("ydb");
    	var tofind=this.model.get("tofind");
    	if (!tofind || !db) {
    		this.sandbox.emit("slottexts.change",{});
    		return ;
    	} 

    	if (tofind[0]==':') {
    		return this.filterbylinenumer(db,parseInt(tofind.substring(1),10));

    	} else if (tofind[0]=='<') {
    		return this.filterbytag(db,tofind.substring(1));
    	} else return this.filterbytofind(db,tofind);
    },
    filterbytofind:function(db,tofind) {
    	var that=this;
    	this.sandbox.yase.phraseSearch({db:db,tofind:tofind,showtext:true,highlight:true},function(err,data) {
    		that.sandbox.emit("slottexts.change",data);
    	});
    },

    filterbytag:function(db,tag) {
      if (tag.indexOf("[")==-1) {
        this.sandbox.yadb.getRaw([db,'tags',tag,'_vpos','*'],function(err,vposarr) {
          that.sandbox.yase.fillText( {db:db,vpos:vposarr},function(err,data) {
            that.sandbox.emit("slottexts.change",data);
          });
        });        
      } else { // attribute 
          var m=tag.match(/(.*?)\[(.*?)=(.*)/);
          if (!m) return;
          var tag=m[1], attribute=m[2],value=m[3];
          if (value[value.length-1]===']') value=value.substring(0,value.length-1);
          this.sandbox.yase.findTag( {db:db, tag:tag, attribute:attribute, value:value},function(err,tagdata){
            var data={};
            if (tagdata.slot)    {
              data[ tagdata.slot] =tagdata.head || tagdata.text;
            } else if (tagdata.length){
                for (var i in tagdata) data[ tagdata[i].slot] =tagdata[i].head || tagdata[i].text;
            }
            that.sandbox.emit("slottexts.change",data);
          });
      }
    },
    filterbylinenumer:function(db,linenumber){
    	var slots=[];
    	var that=this;
    	this.sandbox.yase.getRange({db:db,start:linenumber,end:linenumber+500},function(err,data) {
    		that.sandbox.emit("slottexts.change",data);
    	});
    },
    model:new Backbone.Model(),
    initialize: function() {;
      if (!this.sandbox.minversion('yase','0.0.8')) console.error('yase version too old');
      if (!this.sandbox.minversion('yadb','0.0.6')) console.error('yadb version too old');
      var that=this;
      this.sandbox.on("tofind.change",function(data) {
      	that.model.set({tofind:data})
      });
     this.sandbox.on("ydb.change",function(data) {
      	that.model.set({ydb:data})
      }); 

     this.model.on("change:tofind",this.filter,this);
     this.model.on("change:ydb",this.filter,this);
   }
 };
});
