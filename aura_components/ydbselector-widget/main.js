/*
  2013.8.14 start using Epoxy to do smart binding.
  DOM render is minimized.
  computed value is very useful.
  input : list of ydb
  output: selected ydb
*/
define(['underscore','backbone','text!./ydbselector.tmpl'], 
 function(_,Backbone,template) {
 var myModel=Backbone.Epoxy.Model.extend({
       "defaults":{
          "listing":[],"selected":0
        },
        "computeds": {
          "selectedYdb": {
              "get": function() { 
                return this.get("listing")[ this.get("selected")]  
              }
          }
        }

    })  ;
  return {
    type:"Backbone.Epoxy",
    render: function () {
      var listing=this.model.get("listing");
      var selected=this.model.get("selected");
      this.$el.html(_.template (template,{ ydbs:listing, selected:selected }));
      that.applyBindings(); // because render is not called immediately in intialize
    },
    loadlisting:function() {
      that=this;
      var selected=localStorage.getItem("selected");
      this.sandbox.yadb.getRaw("",function(err,data) {
        that.model.set({"listing":Object.keys(data),"selected":selected});
      });
    },
    saveSelected:function() {
      var listing=this.model.get("listing");
      var selected=this.model.get("selected");      
      localStorage.setItem("selected",selected);
      this.sandbox.emit("ydb.change", listing[selected] );
    },
    model: new myModel(),
    initialize: function() {
      this.model.on('change:listing',this.render,this);
      this.model.on('change:selected',this.saveSelected,this);
      this.loadlisting();
    }
  }
});
