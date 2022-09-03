"use strict";

document.addEventListener("DOMContentLoaded", init);

let commaUsed = false;
let operatorUsed = false;
let resultsShowed = false;
let operator = "";
let topNumbers = "";
let bottomNumbers = "";

function init(){
	clearScreen();
	document.addEventListener("click", checkKey);
}

function checkKey(e){
	if (e.target.getAttribute("data-comma")) {
		addToNumbers();
		commaUsed = true;
	}

	if (e.target.getAttribute("data-number")) displayNumbers(e);

	if (e.target.getAttribute("data-operator")) {
		configureOperation(e);
		commaUsed = false;
	}

	if (e.target.getAttribute("data-enter")) {
		displayResult();
		resultsShowed = true;
	}

	if (e.target.getAttribute("data-clear")) location.reload();
}

function displayNumbers(e){
	let bottom = document.querySelector(`.display .bottom`);
	if (bottom.innerHTML.length >= 11 || resultsShowed) return;
	bottom.innerHTML += e.target.innerHTML;
}

function configureOperation(e){
	const displayBottom = document.querySelector(".display .bottom");
	const displayTop = document.querySelector(".display .top");
	operator = e.target.innerHTML;
	topNumbers = parseFloat(displayBottom.innerHTML);

	if (operatorUsed || displayBottom.innerHTML === "") return;
	operatorUsed = true;

	let html = `${displayBottom.innerHTML + operator}`;
	
	displayTop.insertAdjacentHTML("beforeend", html);
	displayBottom.innerHTML = "";
}

function addToNumbers(){
	if (commaUsed || resultsShowed) return;
	const displayBottom = document.querySelector(".display .bottom");
	displayBottom.innerHTML += ".";
}

function clearScreen(){
	const displayTop = document.querySelector(".display .top");
	const displayBottom = document.querySelector(".display .bottom");

	displayTop.innerHTML = "";
	displayBottom.innerHTML = "";
}

function displayResult(){
	if (resultsShowed) return;
	const displayTop = document.querySelector(".display .top");
	const displayBottom = document.querySelector(".display .bottom");

	bottomNumbers = parseFloat(displayBottom.innerHTML);

	displayTop.innerHTML += displayBottom.innerHTML + "=";
	if (isInt(topNumbers) && isInt(bottomNumbers)){
		displayBottom.innerHTML = eval(topNumbers + operator + bottomNumbers);
	} else {
		console.log(bottomNumbers);
		console.log(topNumbers);
		displayBottom.innerHTML = math_it_up[operator](topNumbers, bottomNumbers).toFixed(2);
	}
}

function isInt(n){
	return n % 1 === 0;
}

const math_it_up = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
	'*': function (x, y) { return x * y },
	'/': function (x, y) { return x / y },
}