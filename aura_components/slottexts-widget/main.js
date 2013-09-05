define(['underscore','backbone','text!./slottexts.tmpl','text!./item.tmpl'], 
 function(_,Backbone,template,itemtemplate) {
  return {
   type:"Backbone",

    
    resize:function() {
      var that=this;
      this.$el.css("height", (window.innerHeight - this.$el.offset().top -18) +"px");
      this.$el.unbind('scroll');
      this.$el.bind("scroll", function() {
        if (that.$el.scrollTop()+ that.$el.innerHeight()+3> that.$el[0].scrollHeight) {
          that.loadscreenful();
        }
      });

    },
    
    render: function (data) {
      if (!data) return;
      this.slottexts=[];
      this.displayed=0;
      for (var i in data) {
        this.slottexts.push( {text:data[i],n:i} );
      }
      this.$el.html(_.template (template,{}));
      this.resize();
      this.loadscreenful();
      //TODO if still have space, load more
    },
    loadscreenful:function() {
      var screenheight=this.$el.innerHeight();
      var $listgroup=$(".list-group");
      var startheight=$listgroup.height();
      if (this.displayed>=this.slottexts.length) return;
      var now=this.displayed||0;
      var H=0;
      for (var i=now;i<this.slottexts.length;i++ ) {
        newitem=_.template(itemtemplate,{text:this.slottexts[i].text ,n:this.slottexts[i].n});
        $listgroup.append(newitem); // this is slow  to get newitem height()
        if ($listgroup.height()-startheight>screenheight) break;
      }
      this.displayed=i+1;
    },
    initialize: function() {
      $(window).resize( _.bind(this.resize,this) );
     this.sandbox.on("slottexts.change",this.render,this);
    }
  }
});
