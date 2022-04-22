document.addEventListener('click', function (event) {
	var elem = document.getElementById('header-catalog');
	event.target.matches('.combo-button') ?
		elem.classList.toggle('header-catalog-show') :
		elem.classList.remove('header-catalog-show');
});