/**
 * Created by cooperanderson on 3/1/17 AD.
 */

$(".container").css({"margin-top": `${(($(window).height()) / 2) - ($(".container").height() * 3 / 4)}px`});
let options = {}, interval;

$("#start").on("click", function(data) {
	options["name"] = $("#name").val();
	options["min-number"] = $("#min-number").val();
	options["max-number"] = $("#max-number").val();
	options["math-problems"] = $("#math-problems").val();
	options["flash-numbers"] = $("#flash-numbers").val();
	options["number-count"] = $("#number-count").val();
	options["show-timer"] = $("#show-timer").val();
	options["hide-timer"] = $("#hide-timer").val();
	options["date"] = new Date().getTime();
	options["number"] = generateNumber(options["number-count"], options["min-number"], options["max-number"]);
	options["entry"] = "";
	$("#options-area").remove();
	$("h1.number").html(options["number"]);
	interval = setInterval(runTest);
});

$("#submit").on("click", function(data) {
	data.preventDefault();
	options["entry"] = $("#entry").val();
	$("#submit-area").css({"display": "none"});
	$(".numbers#number").html(options["number"]);
	$(".numbers#entered-numbers").html(formatEntry(options["number"], options["entry"]));
});

function generateNumber(count, min=0, max=9) {
	let number = ""
	for (let i = 0; i < count; i++) {
		number += Math.floor((Math.random() + min) * (max - min + 1));
	}
	return number;
}

function formatEntry(number, entry) {
	let format = []
	for (let i in number) {
		if (number[i] == entry[i]) {
			format[i] = `<span class="exact-match">${entry[i]}</span>`;
		} else if (!number.includes(entry[i])) {
			format[i] = `<span class="horrible-match">${entry[i]}</span>`;
		} else {
			format[i] = `<span class="partial-match">${entry[i]}</span>`;
		}
	}
	return format.join("");
}

function runTest() {
	let time = new Date(new Date() - options.date);
	if (time.getTime() <= options["show-timer"] * 1000) {
		$("#progress-bar").css({"width": `${time.getTime() / (options["show-timer"] * 10)}%`});
	} else if (time.getTime() - options["show-timer"] * 1000 <= options["hide-timer"] * 1000) {
		$("h1.number").html("");
		$("#progress-bar").css({"width": `${(time.getTime() - options["show-timer"] * 1000) / (options["hide-timer"] * 10)}%`});
	} else {
		$("#progress-bar").css({"width": "0%"});
		$("#submit-area").css({"display": "block"});
		console.log("test");
		clearInterval(interval);
	}
}
