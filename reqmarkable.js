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

			var md, options, typographer;

			options = config.reqmarkable || {};

			if (config.reqmarkable && Object.prototype.toString.call(config.reqmarkable.typographer) === '[object Object]'){
				typographer = JSON.parse(JSON.stringify(config.reqmarkable.typographer));
				options.typographer = true;
			}

			md = new Remarkable(options);

			if (typographer){
				md.typographer.set(typographer);
			}

			text.get(parentRequire.toUrl(name), function(markdownString){
				var result = md.render(markdownString);
				if (config.isBuild){
					buildMap[name] = result.replace(/\r?\n|\r/g, '');
				}
				onload(result);
			});
		}
		, version : '0.1.0'
	};
});
