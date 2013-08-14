define(['underscore','backbone','text!./slottexts.tmpl'], 
 function(_,Backbone,template) {
  return {
   type:"Backbone",
    events: {
    },
    render: function () {
      this.$el.html(_.template (template,{slots:[ {text:'qqqqq',n:1} ]}));
    },
    initialize: function() {
      this.render();
    }
  }
});
