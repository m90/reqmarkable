var requirejs = require('requirejs');
var assert = require('assert');

requirejs.config({
	nodeRequire: require
	, baseUrl : '.'
	, paths : {
		'text' : './bower_components/requirejs-text/text'
		, 'remarkable' : './bower_components/remarkable/dist/remarkable'
		, 'reqmarkable' : './reqmarkable'
	}
});

describe('reqmarkable loader', function(){

	it('should render markdown into HTML', function(done){
		requirejs(['reqmarkable!test/fixtures/test.md'], function(md){
			assert.equal(md, '<h1>h1</h1>\n<h2>h2</h2>\n<h3>h3</h3>\n<h4>h4</h4>\n<h5>h5</h5>\n<h6>h6</h6>\n');
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
			assert.equal(md, '<p><a href="http://github.com">http://github.com</a></p>\n');
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

});

describe('reqmarkable writer', function(done){
	it('compiles markdown into dependency-less modules', function(done){
		requirejs.optimize({
			baseUrl : '.'
			, name : './bower_components/almond/almond'
			, paths : {
				'text' : './bower_components/requirejs-text/text'
				, 'remarkable' : './bower_components/remarkable/dist/remarkable'
				, 'reqmarkable' : './reqmarkable'
			}
			, optimize : 'none'
			, include : ['./test/main']
			, inlineText : false
			, stubModules : ['text', 'remarkable', 'reqmarkable']
			, out: 'test/main-built.js'
		}, function(){
			assert(true);
			done();
		});

	});
});