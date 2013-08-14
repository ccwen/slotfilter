define(['underscore','backbone','text!./slottexts.tmpl'], 
 function(_,Backbone,template) {
  return {
   type:"Backbone",
    events: {
    },
    render: function (data) {
      var slottexts=[];
      for (var i in data) {
        slottexts.push( {text:data[i],n:i} );
      }
      this.$el.html(_.template (template,{slots:slottexts}));
    },
    initialize: function() {
      this.sandbox.on("slottexts.change",this.render,this);
      this.render();
    }
  }
});
