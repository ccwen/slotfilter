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
          var tofind=that.$("#tofind").val();
          that.sandbox.emit('tofind.change',tofind);
          if  (tofind) {
            localStorage.setItem("tofind",tofind);
          }
        },300);
    },
    ydbchanged:function() {
      this.$el.find("#tofind").focus();
      var tofind=localStorage.getItem("tofind");

      if (tofind) {
          $("#tofind").val(tofind);
          this.dosearch();
      } 
    },
    initialize: function() {
      this.sandbox.on("ydb.change",this.ydbchanged,this);
     	this.html(_.template(template,{ value:this.options.value||""}) );
      $("#tofind").focus();
    }
  };
});
