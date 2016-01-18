function processCodeTags(result_object, code_tags) {
	for (var i = 0; i < code_tags.length; i++) {
		if ("type" in code_tags[i].dataset) {
			var text = code_tags[i].innerHTML;
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
		} else {
			// Check if the Powered by paragraph is set
			// If it has not been found before
			if (result_object["powered-by"] !== null)
				continue;
			// Check "Powered by" string presence
			if (paragraphs[i].innerHTML.indexOf("Powered by") < 0)
				continue;
			// Check if link is set properly
			var anchors = paragraphs[i].getElementsByTagName('a');
			if (anchors.length !== 1)
				continue;
			if (anchors[0].href !== "https://www.datacamp.com/")
				continue;
			if (anchors[0].innerHTML.indexOf("DataCamp") < 0)
				continue;
			// If we get here the "Powered by" paragraph was set properly
			result_object["powered-by"] = paragraphs[i];
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
			"powered-by": null
		}

		processParagraphTags(result_object, exercise.getElementsByTagName('p'));

		var powered_by = result_object["powered-by"];
		if (powered_by === null) {
			console.log("ataCamp-Light: Missing the Powered By statement.");
			return;
		}

		processCodeTags(result_object, exercise.getElementsByTagName('code'));

		// Actually replace
		while (exercise.lastChild) {
		    exercise.removeChild(exercise.lastChild);
		}

		// Add "Powered by"
		exercise.appendChild(powered_by);

		// Add iframe
		delete result_object["powered-by"];
		var url = "http://localhost:3003/?" + createURLData(result_object);
		var iframe = document.createElement("iframe");
		iframe.setAttribute("src", url);
		iframe.setAttribute("style", "border: none;");
		exercise.insertBefore(iframe, powered_by);
	}
}

document.addEventListener('DOMContentLoaded', replaceDataCampExercises, false);
