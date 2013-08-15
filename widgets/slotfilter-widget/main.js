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
    		return this.filterbylinenumer(db,parseInt(tofind.substring(1)));

    	} else if (tofind[0]=='<') {
    		return this.filterbytag(db,tofind.substring(1));
    	} else return this.filterbytofind(db,tofind);
    },
    filterbytofind:function(db,tofind) {
    	var that=this;
    	this.sandbox.yase.phraseSearch({db:db,tofind:tofind,showtext:true},function(err,data) {
    		that.sandbox.emit("slottexts.change",data);
    	});
    },
    filterbytag:function(db,tag) {
    	this.sandbox.yadb.getRaw([db,'tags',tag,'_slot','*'],function(err,slots) {
    		that.sandbox.yase.fillText( {db:db,slots:slots},function(err,data) {
    			that.sandbox.emit("slottexts.change",data);
    		});
    	});
    },
    filterbylinenumer:function(db,linenumber){
    	var slots=[];
    	var that=this;
    	this.sandbox.yase.getRange({db:db,start:linenumber,end:linenumber+500},function(err,data) {
    		that.sandbox.emit("slottexts.change",data);
    	});
    },
    model:new Backbone.Model(),
    initialize: function() {
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
