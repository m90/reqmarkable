require(['reqmarkable!test/fixtures/test.md'], function(result){
	var wrapper = document.createElement('div');
	wrapper.innerHTML = result;
	wrapper.id = 'fixture';
	document.body.appendChild(wrapper);
});