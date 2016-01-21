# DataCamp Light

This library allows for interactive coding exercises to be inserted directly into a webpage using a lightweight version of the DataCamp interface.

## Usage
The first step is to include the JavaScript library into your webpage. For this we recommend using the latest release on the DataCamp CDN (https://cdn.datacamp.com/datacamp-light-1.0.0.min.js) like this:

```
<script src="https://cdn.datacamp.com/datacamp-light-1.0.0.min.js"></script>
```

Next we can start creating exercises using simple HTML tags. We will look into how to do this using the following simple example :

```
<div data-datacamp-exercise data-lang="r">
	<code data-type="pre-exercise-code">
		# This will get executed each time the exercise gets initialized
		b = 6
	</code>
	<code data-type="sample-code">
		# Create a variable a, equal to 5


		# Print out a


	</code>
	<code data-type="solution">
		# Create a variable a, equal to 5
		a <- 5

		# Print out a
		print(a)
	</code>
	<code data-type="sct">
		test_object("a")
		test_function("print")
		success_msg("Great job!")
	</code>
	<p data-type="hint">Use the assignment operator (<code><-</code>) to create the variable <code>a</code>.</p>
</div>
```

As we can see in the example, the whole exercise is contained in a single `<div>` element with two data attributes `data-datacamp-exercise` and `data-lang`. The first attribute `data-datacamp-exercise` indicates that the `<div>` should be treated as a DataCamp Light exercise, while the other attribute `data-lang` specifies which programming language should be used.

### Pre-Exercise Code

Pre-exercise code is code that initializes the workspace such that users can start coding the essence of the exercise instead of worrying about loading in data and packages. The way to specify this is by defining a `<code>` tag containing your initialization code and set the `data-type` attribute to `pre-exercise-code` like this:

```
<code data-type="pre-exercise-code">
	# This will get executed each time the exercise gets initialized
	b = 6
</code>
```

In our example we initialize the (the rather useless) variable `b` with value `6`.

### Sample Code

To set the sample code that will be present initially in the code editor, a `<code>` tag should be defined containing the sample code and the `data-type` attribute should be set to `sample-code` like this:

```
<code data-type="sample-code">
	# Create a variable a, equal to 5


	# Print out a


</code>
```

Our example simply shows a couple of comments together with some newlines. The total number of lines of code is used to determine the height of the resulting iframe. As the newlines are counted as well, they can be used to achieve the desired height. The JavaScript library also takes care of stripping leading indentation so no need to worry about that.

### Solution

To set the solution code, a `<code>` tag should be defined containing the solution code and the `data-type` attribute should be set to `solution-code` like this:

```
<code data-type="solution">
	# Create a variable a, equal to 5
	a <- 5

	# Print out a
	print(a)
</code>
```

### Submission Correctness Test (SCT)

A Submission Correctness Test is used to check whether the code submitted by the user properly solves the exercise. For detailed information on this you can look at http://docs.datacamp.com/teach/sct-design-r.html for R and at http://docs.datacamp.com/teach/sct-design-python.html for python. The way to specify the SCT is by defining a `<code>` tag containing your SCT code and set the `data-type` attribute to `sct` like this:

```
<code data-type="sct">
	test_object("a")
	test_function("print")
	success_msg("Great job!")
</code>
```

In our example the first line checks whether the user declared the variable `a` and whether its value matches that of the solution code. The second line checks whether the `print` function is called and lastly a success message is specified that will be shown to the user when the exercise is successfully completed.

### Hint

To specify a hint, a `<p>` should be defined containg the hint and the `data-type` attribute should be set to `hint` like this:

```
<p data-type="hint">Use the assignment operator (<code><-</code>) to create the variable <code>a</code>.</p>
```

It is possible for the hint to contain for instance `<code>` tags as is the case in our example.


## Examples

You can find more examples in the `/example` folder in the repository. You can also test out a live example at http://assets.datacamp.com/example/standalone-two-consoles.html.
