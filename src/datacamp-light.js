'use strict';

var MIN_HEIGHT = 200;
var IFRAME_NAME = "datacamp-light-iframe-";
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
			result.push(encodeURIComponent(entry) + "=" + encodeURIComponent(data[entry]));
	}
	return result.join("&");
}

function createIFrame(exercise_DOM, exercise_data, index) {
	var iframe = document.createElement("iframe");
	iframe.name = IFRAME_NAME + index;
	var style_attribute = "border: 1px solid #d5eaef;";

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
		var sample_lines_length = exercise_data["sample-code"].split(/\r?\n/).length;
		height = Math.max(
			47 + (sample_lines_length-2) * 18,
			min_height
		);

		if ("maxHeight" in exercise_DOM.dataset) {
			var user_max_height = Math.round(exercise_DOM.dataset["maxHeight"]);
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

	// Set width and min-width
	iframe.style.width = "100%";
	iframe.style.minWidth = "600px";
	style_attribute += "width:100%;min-width:600px;"

	// Set style attribute of iframe
	iframe.setAttribute("style", style_attribute);
	return iframe;
}

function createDataForm(exercise_data , index) {
	var url = DATACAMP_LIGHT_URL + (window.location.hostname ? window.location.hostname + "/?" : "?") +
	createURLData({

	});
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", DATACAMP_LIGHT_URL);
    form.setAttribute("target", IFRAME_NAME + index);

    for(var key in exercise_data) {
        if(exercise_data.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", stripIndent(exercise_data[key]));

            form.appendChild(hiddenField);
         }
    }

    return form;
}

function replaceDataCampExercises() {
	var exercises = document.querySelectorAll("[data-datacamp-exercise]");
	for (var i = 0; i < exercises.length; i++) {
		var exercise_DOM = exercises[i];

		if (!("lang" in exercise_DOM.dataset)) {
			console.log("DataCamp-Light: Missing the data-lang attribute.");
			return;
		}

		var exercise_data = {
			"language": exercise_DOM.dataset["lang"],
			"pre-exercise-code": "",
			"sample-code": "",
			"solution": "",
			"sct": "",
			"hint": "",
		}

		processParagraphTags(exercise_data, exercise_DOM.getElementsByTagName('p'));
		processCodeTags(exercise_data, exercise_DOM.getElementsByTagName('code'));

		// Actually replace
		while (exercise_DOM.lastChild) {
		    exercise_DOM.removeChild(exercise_DOM.lastChild);
		}

		// Create iframe
		exercise_DOM.appendChild(createIFrame(exercise_DOM, exercise_data , i));

		// Create form to send exercise data
		var form = createDataForm(exercise_data, i);
		exercise_DOM.appendChild(form);
		form.submit();

		// Remove the form again so no data is visible to the user in the HTML
		exercise_DOM.removeChild(form);
	}
}

document.addEventListener('DOMContentLoaded', replaceDataCampExercises, false);
