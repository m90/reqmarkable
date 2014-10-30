var requirejs = require('requirejs');
var assert = require('assert');

requirejs.config({
	nodeRequire: require
	, baseUrl : '.'
	, paths : {
		'text' : './bower_components/requirejs-text/text'
		, 'remarkable' : './bower_components/remarkable/dist/remarkable'
		, 'highlightjs' : './bower_components/highlightjs-amd/highlight.pack'
		, 'reqmarkable' : './reqmarkable'
	}
});

describe('reqmarkable loader', function(){

	it('should render markdown into HTML', function(done){
		requirejs(['reqmarkable!test/fixtures/test.md'], function(md){
			assert(md.indexOf('<h1>h1</h1>\n<h2>h2</h2>\n<h3>h3</h3>\n<h4>h4</h4>\n<h5>h5</h5>\n<h6>h6</h6>\n') > -1);
			done();
		});
	});

	it('should respect configuration', function(done){
		requirejs.config({
			reqmarkable : {
				linkify : true
			}
		});
		requirejs(['reqmarkable!test/fixtures/hyperlink.md'], function(md){
			assert.equal(md, '<p><a href="https://github.com">https://github.com</a></p>\n');
			done();
		});
	});

	it('can pass options to the typographer', function(done){
		requirejs.config({
			reqmarkable : {
				typographer : {
					copyright: true
				}
			}
		});
		requirejs(['reqmarkable!test/fixtures/copyright.md'], function(md){
			assert.equal(md, '<p>©</p>\n');
			done();
		});
	});

	it('will highlight fenced code blocks if options is set', function(done){
		requirejs.config({
			reqmarkable : {
				highlight : true
			}
		});
		requirejs(['reqmarkable!test/fixtures/code.md'], function(md){
			assert(md.indexOf('<code class="language-javascript">' > -1));
			done();
		});
	});

});

describe('reqmarkable writer', function(done){
	it('compiles markdown into dependency-less modules', function(done){

		this.timeout(7500);

		requirejs.optimize({
			baseUrl : '.'
			, name : './bower_components/almond/almond'
			, paths : {
				'text' : './bower_components/requirejs-text/text'
				, 'remarkable' : './bower_components/remarkable/dist/remarkable'
				, 'reqmarkable' : './reqmarkable'
				, 'highlightjs' : './bower_components/highlightjs-amd/highlight.pack'
			}
			, optimize : 'none'
			, include : ['./test/main']
			, inlineText : false
			, stubModules : ['text', 'remarkable', 'reqmarkable', 'highlightjs']
			, out: 'test/main-built.js'
		}, function(){
			var exec = require('child_process').exec;
			var process = exec('phantomjs test/loadindex.js', function(err, stdout){
				if (err){
					assert(false);
				} else {
					assert(stdout.indexOf('<h1>h1</h1>') > -1);
				}
				done();
			});
		});

	});
});