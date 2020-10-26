var ndate = new Date().getFullYear();
const mydate = document.querySelectorAll('.expdate');
let loopdate = Array.from(mydate).map(function(num) {
	const datadate = num.dataset.date;
	num.innerHTML = ndate - datadate; 
})

//Starts counter
const myrate = document.querySelectorAll('.stars');
let roots = Array.from(myrate).map(function(num) {
	const count = 5;
	let singstar = '<span class="icon-star"></span>';
	let multystars = [];

	for (var i = 0; i < count; i++){
		multystars.push(singstar);
	}

	num.innerHTML = multystars.join(""); 
})