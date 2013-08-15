console.log(require('yase').build({
	dbid:'sample',
	blockshift:7,
	schema:function() {
		this.toctag(["sutra","chapter"])
		      .emptytag("pb").attr("pb","id",{"depth":1})
		      .attr("chapter","n",{"depth":2});
	},
	input:'sample.lst',
	output:'../sample.ydb',
	author:'yapcheahshen@gmail.com',
	version:'0.0.2',
	 //maxfile:0  //
}));