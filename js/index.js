/**
 * Created by cooperanderson on 3/1/17 AD.
 */

$("#area").css({"margin-top": `${(($(window).height()) / 2) - ($("#area").height() * 3 / 4)}px`});
let options = {}, database = firebase.database().ref(), interval;

$(function () {
	$('[data-toggle="tooltip"]').stop();
	$('[data-toggle="tooltip"]').tooltip();
});

$("#field-alert").stop().fadeOut(0);

$("#start").on("click", function(data) {
	options["name"] = $("#name").val();
	options["age"] = $("#age").val();
	options["min-number"] = Number($("#min-number").val());
	options["max-number"] = Number($("#max-number").val());
	options["math-problems"] = $("#math-problems").is(":checked");
	options["flash-numbers"] = $("#flash-numbers").is(":checked");
	options["number-count"] = $("#number-count").val();
	options["show-timer"] = $("#show-timer").val();
	options["hide-timer"] = $("#hide-timer").val();
	options["date"] = new Date().getTime();
	options["number"] = generateNumber(options["number-count"], options["min-number"], options["max-number"]);
	if (includes(options, "")) {
		$("#field-alert").stop().fadeIn();
	} else {
		$("#field-alert").stop().fadeOut(0);
		options["entry"] = "";
		options["version"] = "v0.1.0";
		$("#options-area").remove();
		$("h1.number").html(options["number"]);
		interval = setInterval(runTest);
	}
});

$("#submit").on("click", function(data) {
	data.preventDefault();
	options["entry"] = $("#entry").val();
	$("#submit-area").css({"display": "none"});
	$(".numbers#number").html(options["number"]);
	$(".numbers#entered-numbers").html(formatEntry(options["number"], options["entry"]));
	database.child("data").child(options["date"]).set(options);
});

function includes(array, value) {
	for (let key in array) {
		if (array[key] === value) {
			return true;
		}
	}
	return false;
}

function generateNumber(count, min=0, max=9) {
	let number = ""
	for (let i = 0; i < count; i++) {
		number += (Math.floor(Math.random() * (max - min + 1)) + min).toString();
	}
	return number;
}

function formatEntry(number, entry) {
	let format = []
	for (let i in number) {
		if (i < entry.length) {
			if (number[i] == entry[i]) {
				format[i] = `<span class="exact-match">${entry[i]}</span>`;
			} else if (!number.includes(entry[i])) {
				format[i] = `<span class="horrible-match">${entry[i]}</span>`;
			} else {
				format[i] = `<span class="partial-match">${entry[i]}</span>`;
			}
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
