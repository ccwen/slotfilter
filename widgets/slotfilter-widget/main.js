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
    	var that=this;
    	this.sandbox.yase.phraseSearch({db:db,tofind:tofind,showtext:true},function(err,data) {
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
