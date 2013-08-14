define(['underscore','backbone','text!./slottexts.tmpl','text!./item.tmpl'], 
 function(_,Backbone,template,itemtemplate) {
  return {
   type:"Backbone",

    
    resize:function() {
      var that=this;
      this.$el.css("height", (window.innerHeight - this.$el.offset().top) +"px");
      this.$el.unbind('scroll');
      this.$el.bind("scroll", function() {
        if (that.$el.scrollTop()+ that.$el.innerHeight()+3> that.$el[0].scrollHeight) {
          that.loadmore();
        }
      });

    },
    
    render: function (data) {
      if (!data) return;
      this.slottexts=[];
      for (var i in data) {
        this.slottexts.push( {text:data[i],n:i} );
      }
      var slotperbatch=this.options.slotperbatch || 20;
      this.displayed=slotperbatch;
      this.$el.html(_.template (template,{itemtemplate:itemtemplate,slotperbatch:slotperbatch,slots:this.slottexts}));
      this.resize();
    },
    loadmore:function() {
      if (this.displayed>=this.slottexts.length) return;
      var slotperbatch=this.options.slotperbatch || 20;
      var now=this.displayed+1;
      this.displayed+=slotperbatch;
      var newitems="";
      for (var i=now;i<this.displayed && i<this.slottexts.length;i++ ) {
        newitems+=_.template(itemtemplate,{text:this.slottexts[i].text ,n:this.slottexts[i].n})
      }
      $(".list-group").append(newitems);
    },
    initialize: function() {
      $(window).resize( _.bind(this.resize,this) );
     this.sandbox.on("slottexts.change",this.render,this);
    }
  }
});
