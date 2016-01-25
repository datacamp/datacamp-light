'use strict';

var MIN_HEIGHT = 200;
var DATACAMP_LIGHT_URL = "https://light.datacamp.com/";

/**
 * Inspired by https://github.com/sindresorhus/strip-indent
 */
function stripIndent(code_block) {
	var match = code_block.match(/^[ \t]*(?=\S)/gm);

	if (!match) {
		return code_block;
	}

	var indent = Math.min.apply(Math, match.map(function (el) {
		return el.length;
	}));

	var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');

	code_block = indent > 0 ? code_block.replace(re, '') : code_block;
	var lines = code_block.split(/\r?\n/);
	if (lines[lines.length-1].trim() === "") {
		lines.splice(lines.length-1, 1);
	}
	if (lines[0].trim() === "") {
		lines.splice(0, 1);
	}
	return lines.join("\n");
}

function unescapeHtml(safe) {
	return safe.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'");
}

function processCodeTags(result_object, code_tags) {
	for (var i = 0; i < code_tags.length; i++) {
		if ("type" in code_tags[i].dataset) {
			var text = unescapeHtml(code_tags[i].innerHTML);
			var type = code_tags[i].dataset["type"];
			if (type === "pre-exercise-code") {
				result_object["pre-exercise-code"] = text;
			}
			else if (type === "sample-code") {
				result_object["sample-code"] = text;
			}
			else if (type === "solution") {
				result_object["solution"] = text;
			}
			else if (type === "sct") {
				result_object["sct"] = text;
			}
		}
	}
}

function processParagraphTags(result_object, paragraphs) {
	for (var i = 0; i < paragraphs.length; i++) {
		if ("type" in paragraphs[i].dataset) {
			var type = paragraphs[i].dataset["type"];
			if (type === "hint") {
				result_object["hint"] = paragraphs[i].innerHTML;
			}
		}
	}
}

function createURLData(data) {
	var result = [];
	for (var entry in data) {
		if (data.hasOwnProperty(entry))
			result.push(encodeURIComponent(entry) + "=" + encodeURIComponent(stripIndent(data[entry])));
	}
	return result.join("&");
}

function replaceDataCampExercises() {
	var exercises = document.querySelectorAll("[data-datacamp-exercise]");
	for (var i = 0; i < exercises.length; i++) {
		var exercise = exercises[i];

		if (!("lang" in exercise.dataset)) {
			console.log("DataCamp-Light: Missing the data-lang attribute.");
			return;
		}

		var result_object = {
			"language": exercise.dataset["lang"],
			"pre-exercise-code": "",
			"sample-code": "",
			"solution": "",
			"sct": "",
			"hint": "",
		}

		processParagraphTags(result_object, exercise.getElementsByTagName('p'));
		processCodeTags(result_object, exercise.getElementsByTagName('code'));

		// Actually replace
		while (exercise.lastChild) {
		    exercise.removeChild(exercise.lastChild);
		}

		// Add iframe
		var url = DATACAMP_LIGHT_URL + (window.location.hostname ? window.location.hostname + "/?" : "?") + createURLData(result_object);
		var iframe = document.createElement("iframe");
		iframe.setAttribute("src", url);
		var style_attribute = "border: 1px solid #d5eaef;";

		// Calculate height of iframe
		var doHeightCalculation = true;
		var height;
		if ("height" in exercise.dataset) {
			var user_height = Math.round(exercise.dataset["height"]);
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
			if ("minHeight" in exercise.dataset) {
				var user_min_height = Math.round(exercise.dataset["minHeight"]);
				if (!isNaN(user_min_height)) {
					if (user_min_height > MIN_HEIGHT) {
						min_height = user_min_height;
					} else {
						console.log("The min-height attribute should be larger than " + MIN_HEIGHT + ".");
					}
				} else {
					console.log("Invalid min-height attribute.");
				}
			}

			// Get height based on sample-code
			var sample_lines_length = result_object["sample-code"].split(/\r?\n/).length;
			height = Math.max(
				47 + (sample_lines_length-2) * 18,
				min_height
			);

			if ("maxHeight" in exercise.dataset) {
				var user_max_height = Math.round(exercise.dataset["maxHeight"]);
				if (!isNaN(user_max_height)) {
					if (user_max_height > MIN_HEIGHT) {
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
		style_attribute += "height:" + height + "px;"

		// Set min-width
		iframe.style.minWidth = "600px";
		style_attribute += "min-width:600px;"

		// Set style attribute of iframe
		iframe.setAttribute("style", style_attribute);

		// Append iframe
		exercise.appendChild(iframe);
	}
}

document.addEventListener('DOMContentLoaded', replaceDataCampExercises, false);
