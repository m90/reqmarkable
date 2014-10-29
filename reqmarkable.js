define(['text', 'remarkable'], function(text, Remarkable){
	var
	buildMap = {};

	return {
		write: function(pluginName, name, write){
			if (name in buildMap){
				write('define("' + pluginName + '!' + name + '", function(){ return "' + buildMap[name] + '"; });\n');
			}
		}
		, load: function (name, parentRequire, onload, config){

			function doLoad(options){
				var md = new Remarkable(options);

				if (typographer){
					md.typographer.set(typographer);
				}

				text.get(parentRequire.toUrl(name), function(markdownString){
					var result = md.render(markdownString);
					if (config.isBuild){
						buildMap[name] = result.replace(/\n/g, '\\n').replace(/"/g,'\\"');
					}
					onload(result);
				});
			}

			var options, typographer;

			options = config.reqmarkable || {};

			if (config.reqmarkable && Object.prototype.toString.call(config.reqmarkable.typographer) === '[object Object]'){
				typographer = JSON.parse(JSON.stringify(config.reqmarkable.typographer));
				options.typographer = true;
			}


			if (config.highlight){
				require(['highlightjs'], function(hljs){
					options.highlight = function(str, lang){
						if (lang && hljs.getLanguage(lang)){
							try {
								return hljs.highlight(lang, str).value;
							} catch(e){}
						}

						try {
							return hljs.highlightAuto(str).value;
						} catch(e){}

						return ''; // use external default escaping
					};
					doLoad(options);
				});
			} else {
				doLoad(options);
			}

		}
		, version : '0.1.0'
	};
});
