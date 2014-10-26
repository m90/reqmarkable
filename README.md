# reqmarkable
> a loader plugin for loading Markdown files in requirejs, using the [Remarkable Markdown Parser][1]

## Install the plugin and its dependencies using bower:
```sh
$ bower install reqmarkable --save
```
If you prefer a manual install, make sure to satisfy the `remarkable` and `text` dependencies.

## Simple usage:
First, make sure the module names `remarkable` and `text` resolve to the proper locations (both are installed alongside the loader when you are using bower):
```js
requirejs.config({
    paths : {
        reqmarkable : './bower_components/reqmarkable/reqmarkable',
        remarkable : './bower_components/remarkable/dist/remarkable',
        text : './bower_components/requirejs-text/text'
    }
});
```

Now you're ready to `require` rendered Markdown:
```js
require('reqmarkable!some/folder/somefile.md', function(data){
    console.log(data); // => logs somefile.md transformed into HTML
});
```

If you want to pass configuration options to the renderer use the `reqmarkable` key of your `requirejs` configuration:

```js
requirejs.config({
    reqmarkable : {
        breaks: true,
        linkify: true
    }
});
```
For a full list of options, see the [Remarkable repository][1].

## Build time:
On build time you can simply use `stubModules` in your build config to get rid of the Parser in the file you ship to production:
```js
({
    stubModules: ['text','remarkable','reqmarkable']
})
```

##License
MIT © [Frederik Ring](http://www.frederikring.com)

[1]: https://github.com/jonschlinkert/remarkable