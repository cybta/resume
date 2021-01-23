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


//ACCORDION STARTS HERE
const accordion = document.querySelector('.accordion');
const items     = accordion.querySelectorAll('li');
const jobtitle = accordion.querySelectorAll('.jobtitle');

//Lets figure out what item to click
function toggleAccordion() {
  const thisItem = this.parentNode;
  
    items.forEach(item => {
      if (thisItem == item) {
        thisItem.classList.toggle('open');
        return;
    }
  
    item.classList.remove('open');
  });
}



jobtitle.forEach(question => question.addEventListener('click', toggleAccordion));