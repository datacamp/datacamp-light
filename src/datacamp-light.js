'use strict';

var MIN_HEIGHT = 200;
var IFRAME_NAME = "datacamp-light-iframe-";
var DATACAMP_LIGHT_URL = "https://light.datacamp.com/";


function trimCode(code_block) {
	var lines = code_block.split(/\r?\n/);
	if (lines.length > 1 && lines[lines.length-1].trim() === "") {
		lines.pop();
	}
	if (lines[0].trim() === "") {
		lines.shift();
	}
	return lines.join("\n");
}

/**
 * Inspired by https://github.com/sindresorhus/strip-indent
 */
function stripIndent(code_block) {
	var match = code_block.match(/^[ \t]*(?=\S)/gm);

	if (!match) {
		return trimCode(code_block);
	}

	var indent = Math.min.apply(Math, match.map(function (el) {
		return el.length;
	}));

	if (indent > 0) {
		code_block = code_block.replace(new RegExp('^[ \\t]{' + indent + '}', 'gm'), '');
	}

	return trimCode(code_block);
}

function unescapeHtml(safe) {
	return safe.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'");
}

function processExerciseProperties(result_object, code_tags) {
	for (var i = 0; i < code_tags.length; i++) {
		if ("type" in code_tags[i].dataset) {
			var text = unescapeHtml(code_tags[i].innerHTML);
			var type = code_tags[i].dataset["type"];
			if (type === "pre-exercise-code") {
				result_object["pre-exercise-code"] = stripIndent(text);
			}
			else if (type === "sample-code") {
				result_object["sample-code"] = stripIndent(text);
			}
			else if (type === "solution") {
				result_object["solution"] = stripIndent(text);
			}
			else if (type === "sct") {
				result_object["sct"] = stripIndent(text);
			}
			else if (type === "hint") {
				result_object["hint"] = text;
			}
		}
	}
}

function createIFrame(exercise_DOM, exercise_data, index) {
	var iframe = document.createElement("iframe");
	iframe.name = IFRAME_NAME + index;

	// Calculate height of iframe
	var doHeightCalculation = true;
	var height;
	if ("height" in exercise_DOM.dataset) {
		var user_height = Math.round(exercise_DOM.dataset["height"]);
		if (!isNaN(user_height)) {
			if (user_height > MIN_HEIGHT) {
				height = user_height;
				doHeightCalculation = false;
			} else {
				console.log("The height attribute should be larger than " + MIN_HEIGHT + ".");
			}
		} else {
			console.log("Invalid height attribute.");
		}
	}

	if (doHeightCalculation) {
		// Get min-height
		var min_height = MIN_HEIGHT;
		if ("minHeight" in exercise_DOM.dataset) {
			var user_min_height = Math.round(exercise_DOM.dataset["minHeight"]);
			if (!isNaN(user_min_height)) {
				if (user_min_height >= MIN_HEIGHT) {
					min_height = user_min_height;
				} else {
					console.log("The min-height attribute should be larger than " + MIN_HEIGHT + ".");
				}
			} else {
				console.log("Invalid min-height attribute.");
			}
		}

		// Get height based on sample-code
		var sample_lines_length = exercise_data["sample-code"].split(/\r?\n/).length;
		height = Math.max(
			82 + (sample_lines_length) * 16,
			min_height
		);

		if ("maxHeight" in exercise_DOM.dataset) {
			var user_max_height = Math.round(exercise_DOM.dataset["maxHeight"]);
			if (!isNaN(user_max_height)) {
				if (user_max_height >= MIN_HEIGHT) {
					height = Math.min(height, user_max_height);
				} else {
					console.log("The max-height attribute should be larger than " + MIN_HEIGHT + ".");
				}
			} else {
				console.log("Invalid max-height attribute.");
			}
		}
	}

	iframe.style.height = height + "px";
	var style_attribute = "height:" + height + "px;"

	// Set width
	iframe.style.width = "100%";
	style_attribute += "width:100%;"

	// Set style attribute of iframe
	iframe.setAttribute("style", style_attribute);
	return iframe;
}

function createDataForm(exercise_data , index) {
	var url = DATACAMP_LIGHT_URL + (window.location.hostname ? window.location.hostname + "/" : "");
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", url);
	form.setAttribute("target", IFRAME_NAME + index);

	for(var key in exercise_data) {
		if(exercise_data.hasOwnProperty(key)) {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", exercise_data[key]);

			form.appendChild(hiddenField);
		 }
	}

	return form;
}

function replaceDataCampExercises() {
	var exercises = document.querySelectorAll("[data-datacamp-exercise]");
	for (var i = 0; i < exercises.length; i++) {
		(function (index){
			var exercise_DOM = exercises[index];

			if (exercise_DOM.getElementsByTagName("iframe").length > 0) {
				// We use this check to see if the exercise is already replaced.
				return;
			}

			var exercise_data = {
				"language": ("lang" in exercise_DOM.dataset) ? exercise_DOM.dataset["lang"] : "",
				"pre-exercise-code": "",
				"sample-code": "",
				"solution": "",
				"sct": "",
				"hint": "",
			}

			processExerciseProperties(exercise_data, exercise_DOM.querySelectorAll('[data-type]'));

			// Actually replace
			while (exercise_DOM.lastChild) {
				exercise_DOM.removeChild(exercise_DOM.lastChild);
			}

			// Create iframe
			exercise_DOM.appendChild(createIFrame(exercise_DOM, exercise_data , index));

			// Create form to send exercise data
			var form = createDataForm(exercise_data, index);
			exercise_DOM.appendChild(form);
			form.submit();

			// Remove the form again so no data is visible to the user in the HTML
			exercise_DOM.removeChild(form);
		})(i);
	}
}



function insertCSS() {
	var style = document.createElement('style');
	style.type = 'text/css';
	document.getElementsByTagName("head")[0].appendChild(style);

	var css =	"div[data-datacamp-exercise] > iframe {" +
					"margin: 0;" +
					"border: 1px solid #d5eaef;}" +
				"div[data-datacamp-exercise] > code," +
				"div[data-datacamp-exercise] > div," +
				"div[data-datacamp-exercise] > p {" +
					"display: none }" +
				"div[data-datacamp-exercise] {" +
					"background-image: url(https://cdn.datacamp.com/spinner.gif);" +
					"background-repeat:no-repeat;" +
					"background-position: center center;" +
					"background-size: auto 80px;}";

	if (style.styleSheet)
		style.styleSheet.cssText = css;
	else
		style.innerHTML = css;
}

insertCSS();
replaceDataCampExercises();
document.addEventListener('DOMContentLoaded', replaceDataCampExercises);
