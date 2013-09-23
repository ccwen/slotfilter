console.log(require('yase').build({
	dbid:'sample',
	input:'sample.lst',
	output:'../sample.ydb',
	slotshift:7,
	author:'yapcheahshen@gmail.com',
	schema:function() {
		this.toctag(["book","sutra","chapter"])
		      .emptytag("pb").attr("pb","id",{"depth":2})
		      .attr("chapter","n",{"depth":1,"allowrepeat":true});
	},
	TOC:function() {
		this.addToc("page",[book])
	}
}));

