var page = require('webpage').create();
page.open('test/index.html', function(status){
	setTimeout(function(){
		var ok = page.content.indexOf('<h1>h1</h1><h2>h2</h2><h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6>') > -1;
	    console.log(ok);
	    phantom.exit();
	}, 2000);
});