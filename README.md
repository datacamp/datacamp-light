[![DataCamp Light banner](http://assets.datacamp.com/img/github/datacamp-light/bannerv3.1.png "Banner")](http://assets.datacamp.com/example/standalone-two-consoles.html)

# DataCamp Light

* Convert any website or blog to an interactive learning platform.
* Works for both R and Python.
* Easy to install.
* Convert existing markdown documents to an interactive course using [the tutorial package](https://github.com/datacamp/tutorial).
* Check out [an example on DataCamp](https://www.datacamp.com/courses/free-introduction-to-r/chapter-1-intro-to-basics-1-r), or a [demo R and Python example](http://assets.datacamp.com/example/standalone-two-consoles.html).
* Leverage the same [Submission Correctness Tests (SCT)](http://docs.datacamp.com/teach/sct-design-r.html) DataCamp uses for all their courses.


## Student flow
The user attempts to solve the exercise.
![DataCamp Light example 1](http://assets.datacamp.com/img/github/datacamp-light/example_r_1.jpg "Example 1 R")

The user can play around in the interactive R or Python console on the right.
![DataCamp Light example 2](http://assets.datacamp.com/img/github/datacamp-light/example_r_2.jpg "Example 2 R")

By giving automated feedback, the user is guided to the correct solution.
![DataCamp Light example 3](http://assets.datacamp.com/img/github/datacamp-light/example_r_3.jpg "Example 3 R")


## How to use?

### Using the Wordpress plugin
Installation instructions can be found [here](https://github.com/datacamp/datacamp-light-wordpress).

### Using the tutorial package
Convert existing `.Rmd` files to an interactive HTML by installing the [tutorial R package](https://github.com/datacamp/tutorial).

### Using the JavaScript library
You will first need to include the JavaScript library on your webpage. We recommend using the latest release on the DataCamp CDN (https://cdn.datacamp.com/datacamp-light-1.0.0.min.js):

```html
<script src="https://cdn.datacamp.com/datacamp-light-1.0.0.min.js"></script>
```

#### Writing the HTML block
After including the JavaScript library, you can start writing HTML blocks in the format below. These will be dynamically converted to exercises.

```html
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
	<div data-type="hint">Use the assignment operator (<code><-</code>) to create the variable <code>a</code>.</div>
</div>
```
This code chunck will be transformed to the following exercise:
![DataCamp Light example 4](http://assets.datacamp.com/img/github/datacamp-light/example_r_start.jpg "Example 4")

As we can see in the example, the whole exercise is contained in a single `<div>` element with two data attributes `data-datacamp-exercise` and `data-lang`. The first attribute `data-datacamp-exercise` indicates that the `<div>` should be treated as a DataCamp Light exercise, while the other attribute `data-lang` specifies which programming language should be used. The accepted values for `data-lang` are `r` and `python`

#### Pre-Exercise Code

Pre-exercise code is executed when the R/Python session is initialized. You can use it to pre-load datasets, packages, etc. for students. The way to specify this is by defining a `<code>` tag containing your initialization code and set the `data-type` attribute to `pre-exercise-code` like this:

```html
<code data-type="pre-exercise-code">
	# This will get executed each time the exercise gets initialized
	b = 6
</code>
```

In our example we initialize the (rather useless) variable `b` with value `6`.

#### Sample Code

To set the sample code that will be present initially in the code editor, a `<code>` tag should be defined containing the sample code and the `data-type` attribute should be set to `sample-code` like this:

```html
<code data-type="sample-code">
	# Create a variable a, equal to 5


	# Print out a


</code>
```

Our example simply shows a couple of comments together with some newlines. The total number of lines of code is used to determine the height of the resulting iframe. As the newlines are counted as well, they can be used to achieve the desired height. The JavaScript library also takes care of stripping leading indentation so no need to worry about that.

#### Solution

To set the solution code, a `<code>` tag should be defined containing the solution code and the `data-type` attribute should be set to `solution-code` like this:

```html
<code data-type="solution">
	# Create a variable a, equal to 5
	a <- 5

	# Print out a
	print(a)
</code>
```

#### Submission Correctness Test (SCT)

A Submission Correctness Test is used to check whether the code submitted by the user properly solves the exercise. For detailed information on this you can look at [the documentation for R](https://github.com/datacamp/testwhat) and at [the documentation for Python](https://github.com/datacamp/pythonwhat). The way to specify the SCT is by defining a `<code>` tag containing your SCT code and set the `data-type` attribute to `sct` like this:

```html
<code data-type="sct">
	test_object("a")
	test_function("print")
	success_msg("Great job!")
</code>
```

In our example the first line checks whether the user declared the variable `a` and whether its value matches that of the solution code. The second line checks whether the `print` function is called and lastly a success message is specified that will be shown to the user when the exercise is successfully completed.

#### Hint

To specify a hint, a tag should be defined containing the hint and the `data-type` attribute should be set to `hint` like this:

```html
<div data-type="hint">Use the assignment operator (<code><-</code>) to create the variable <code>a</code>.</div>
```

It is possible for the hint to contain for instance `<code>` tags as is the case in our example.


## Examples

You can find more examples in the `example` folder in the repository. You can also test out [an example on DataCamp](https://www.datacamp.com/courses/free-introduction-to-r/chapter-1-intro-to-basics-1-r), or a [demo R and Python example](http://assets.datacamp.com/example/standalone-two-consoles.html).
