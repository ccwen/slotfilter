/*
non visual widget for filtering slot by tofind
*/
define([], function() {
  return {
    initialize: function() {
      this.sandbox.on("tofind.change",this.filter,this)
    }
  };
});
