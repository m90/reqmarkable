define(['text', 'remarkable', 'highlightjs'], function(text, Remarkable, hljs){
	var
	buildMap = {};

	return {
		write: function(pluginName, name, write){
			if (name in buildMap){
				write('define("' + pluginName + '!' + name + '", function(){ return "' + buildMap[name] + '"; });\n');
			}
		}
		, load: function (name, parentRequire, onload, config){

			var options, typographer, md;

			options = config.reqmarkable || {};

			if (config.reqmarkable && Object.prototype.toString.call(config.reqmarkable.typographer) === '[object Object]'){
				typographer = JSON.parse(JSON.stringify(config.reqmarkable.typographer));
				options.typographer = true;
			}


			if (config.reqmarkable && config.reqmarkable.highlight){
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
			}


			if (typographer){
				options.typographer = true;
				for (var key in typographer){
					if (typographer.hasOwnProperty(key)){
						options[key] = typographer[key];
					}
				}
			}

			md = new Remarkable(options);

			text.get(parentRequire.toUrl(name), function(markdownString){
				var result = md.render(markdownString);
				if (config.isBuild){
					buildMap[name] = result.replace(/\n/g, '\\n').replace(/"/g,'\\"');
				}
				onload(result);
			});

		}
		, version : '0.5.1'
	};
});
