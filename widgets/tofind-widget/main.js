define(['underscore','text!./tofind.tmpl'], function(_,template) {
  return {
    type: 'Backbone',
    events: {
    	"keyup #tofind":"dosearch",
    },
    dosearch:function() {
        if (this.timer) clearTimeout(this.timer);
        var that=this;
        this.timer=setTimeout(function(){
          that.sandbox.emit('tofind.change',that.$("#tofind").val());
        },300);
    },
    ydbchanged:function() {
      this.$el.find("#tofind").focus();
    },
    initialize: function() {
      this.sandbox.on("ydb.change",this.ydbchanged,this);
     	this.html(_.template(template,{ value:this.options.value||""}) );
      $("#tofind").focus();
    }
  };
});
