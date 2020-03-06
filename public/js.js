var btn1         = null;
var btn2         = null;
var btn1_1       = null;
var btn1_2       = null;
var btn2_1       = null;
var btn2_2       = null;
var btn_next     = null;
var p_1          = null;
var p_2          = null;
var btn_difficulty = null;
var p_ratio      = null;
var p_difficulty = null;

var value1       = [null, null];
var value2       = [null, null];
var answer;
var difficulty = 0;

var numberOfCorrect = [ 0, 0, 0 ];
var numberOfWrong = [ 0, 0, 0 ];

// show the correct ratio as percentage
function showCorrectRatio() {
	var i, difficulty, numberOfTry;
	for (i = 0; i < p_ratio.length; i++) {
		difficulty = parseInt(p_ratio[i].dataset.difficulty);
		numberOfTry = numberOfCorrect[difficulty] + numberOfWrong[difficulty];
		if (numberOfTry == 0) {
			p_ratio[i].innerHTML = '-';
		} else {
			p_ratio[i].innerHTML = parseInt(numberOfCorrect[difficulty] / numberOfTry * 100) + '%';
		}
	}
}

function set_difficulty() {
	difficulty = parseInt(this.dataset.difficulty);
	if (difficulty == 0) p_difficulty.innerHTML = 'Easy';
	if (difficulty == 1) p_difficulty.innerHTML = 'Normal';
	if (difficulty == 2) p_difficulty.innerHTML = 'Hard';

	init_value();
}

function random_by_difficulty() {
	var r = Math.random();
	
	if (difficulty == 0) return r * 0.080 + 0.040;
	if (difficulty == 1) return r * 0.060 + 0.020;
	if (difficulty == 2) return r * 0.035 + 0.005;
}

function my_random() {
	var r1 = Math.random();
	var r2 = Math.random();
	var r3 = Math.random();
	var return_number;

	     if (r1 < 0.25) return_number = parseInt(r2 * 700) + 200;
	else if (r1 < 0.5)  return_number = parseInt(r2 * 8000) + 1500;
	else if (r1 < 0.75) return_number = parseInt(r2 * 80000) + 15000;
	else                return_number = parseInt(r2 * 800000) + 150000;

	if (r3 > 0.6) {
		     if (return_number > 100000) return_number -= return_number % 1000;
		else if (return_number > 10000 ) return_number -= return_number % 100;
		else                             return_number -= return_number % 10;
	} else if (r3 > 0.2) {
		     if (return_number > 100000) return_number -= return_number % 10000;
		else if (return_number > 10000 ) return_number -= return_number % 1000;
		else if (return_number > 1000  ) return_number -= return_number % 100;
		else if (return_number > 100   ) return_number -= return_number % 10;
	}

	return return_number;
}

function init_elements() {
	btn1.classList.remove('bg-correct', 'bg-wrong');
	btn2.classList.remove('bg-correct', 'bg-wrong');
	btn1.disabled = btn2.disabled = false;
	btn_next.disabled = true;
	p_1.innerHTML = p_2.innerHTML = '-';
}

function init_value() {
	var v1, v2, temp;
	var fraction1, fraction2;
	var numerator1, denominator1, numerator2, denominator2;

	init_elements();

	v1 = Math.random() * 0.6 + 0.2;
	temp = random_by_difficulty();
	v2 = (Math.random() > 0.5) ? v1 + temp : v1 - temp;

	denominator1 = my_random();
	if (Math.random() > 0.5) denominator2 = my_random();
	else denominator2 = parseInt(denominator1 * (Math.random() * 0.4 + 0.5));

	numerator1 = parseInt(denominator1 * v1);
	numerator2 = parseInt(denominator2 * v2);

	if (Math.random() < 0.5) {
		value1 = [numerator1, denominator1];
		value2 = [numerator2, denominator2];
	} else {
		value1 = [numerator2, denominator2];
		value2 = [numerator1, denominator1];
	}

	fraction1 = value1[0] / value1[1];
	fraction2 = value2[0] / value2[1];
	
	answer = (fraction1 > fraction2) ? btn1 : btn2;

	btn1_1.innerHTML = value1[0];
	btn1_2.innerHTML = value1[1];
	btn2_1.innerHTML = value2[0];
	btn2_2.innerHTML = value2[1];
	btn1.value = fraction1.toString().slice(0, 6);
	btn2.value = fraction2.toString().slice(0, 6);
}

function check_answer() {
	p_1.innerHTML = btn1.value;
	p_2.innerHTML = btn2.value;

	if (this == answer) {
		this.classList.add("bg-correct");
		numberOfCorrect[difficulty]++;
	} else {
		this.classList.add("bg-wrong");
		numberOfWrong[difficulty]++;
	}

	btn1.disabled = btn2.disabled = true;
	btn_next.disabled = false;

	showCorrectRatio();
}

window.onload = function() {
	btn1           = document.getElementById('btn_1');
	btn2           = document.getElementById('btn_2');
	btn1_1         = document.getElementById('btn_1_1');
	btn1_2         = document.getElementById('btn_1_2');
	btn2_1         = document.getElementById('btn_2_1');
	btn2_2         = document.getElementById('btn_2_2');
	btn_next       = document.getElementById('btn_next');
	p_1            = document.getElementById('p_1');
	p_2            = document.getElementById('p_2');
	p_difficulty   = document.getElementById('p_difficulty');
	btn_difficulty = document.getElementsByClassName('btn_difficulty');
	p_ratio        = document.getElementsByClassName('p_ratio');

	showCorrectRatio();
	init_value();

	btn1.addEventListener('click', check_answer);
	btn2.addEventListener('click', check_answer);
	btn_next.addEventListener('click', init_value);

	for (var i = 0; i < btn_difficulty.length; i++)
		btn_difficulty[i].addEventListener('click', set_difficulty);
};