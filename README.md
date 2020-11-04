<h1 align="center">DataCamp Light</h1>
<p align="center">
  <a href="https://github.com/datacamp/datacamp-light/projects/1">Roadmap</a> |
  <a href="https://cdn.datacamp.com/dcl-react-prod/index.html">Docs</a>
</p>
<p align="center">
  <a href="https://codecov.io/gh/datacamp/datacamp-light"><img src="https://codecov.io/gh/datacamp/datacamp-light/branch/beta/graph/badge.svg" /></a>
</p>

[![DataCamp Light banner](https://assets.datacamp.com/img/github/datacamp-light/banner-new.png "Banner")](https://cdn.datacamp.com/dcl-react/standalone-example.html)

<details>
<summary><strong>Table of Contents</strong></summary>

<!-- TOC is automatically updated on the pre-commit hook -->

<!-- toc -->

- [Features](#features)
- [How to run the app](#how-to-run-the-app)
- [Writing the HTML block](#writing-the-html-block)
  * [Pre-Exercise Code](#pre-exercise-code)
  * [Sample Code](#sample-code)
  * [Solution](#solution)
  * [Submission Correctness Test (SCT)](#submission-correctness-test-sct)
  * [Hint](#hint)
  * [Other Options](#other-options)
- [How does it work?](#how-does-it-work)
- [Contributing](#contributing)
  * [Dependencies](#dependencies)
  * [Testing](#testing)
    + [Run tests](#run-tests)
    + [Reducers](#reducers)
    + [Components](#components)
    + [Middleware](#middleware)
  * [DevOps](#devops)
    + [Formatting with Prettier](#formatting-with-prettier)
    + [Code Quality: ESLint, TSLint, Stylelint](#code-quality-eslint-tslint-stylelint)
    + [Commit Messages](#commit-messages)
    + [Continuous Integration](#continuous-integration)
    + [Packages used that you might want to know about](#packages-used-that-you-might-want-to-know-about)

<!-- tocstop -->

</details>

--------------------------------------------------------------------------------






## Features

* Convert any website or blog to an interactive learning platform.
* Works for both R and Python. Sessions are maintained on DataCamp's servers.
* Convert existing markdown documents to an interactive course using [the
  tutorial package](https://github.com/datacamp/tutorial).
* Check out a [demo R and Python
  example](https://cdn.datacamp.com/dcl-react/standalone-example.html).
* Leverage the same Submission Correctness Tests (SCT) DataCamp uses for all
  their courses. For R, there's the
  [testwhat](https://github.com/datacamp/testwhat) ([GitHub
  wiki](https://github.com/datacamp/testwhat/wiki)); for Python, there's
  [pythonwhat](https://github.com/datacamp/pythonwhat) ([GitHub
  wiki](https://github.com/datacamp/pythonwhat/wiki)).






## How to run the app
Add the script to your HTML page (there is an example in
`examples/standalone-example.html`):

```html
<script type="text/javascript" src="//cdn.datacamp.com/dcl-react.js.gz"></script>
```

That's it! If your app adds DataCamp Light exercises after the initial page load
(for example, in React apps), call the following function to initialize those
new exercises:

```js
initAddedDCLightExercises();
```

**You can also use the JavaScript library in a stackoverflow.com answer by
including the exercise and script tag as a snippet.**



## Writing the HTML block

After including the JavaScript library, you can start writing HTML blocks in the
format below. These will be dynamically converted to exercises.

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

As we can see in the example, the whole exercise is contained in a single
`<div>` element with two data attributes `data-datacamp-exercise` and
`data-lang`. The first attribute `data-datacamp-exercise` indicates that the
`<div>` should be treated as a DataCamp Light exercise, while the other
attribute `data-lang` specifies which programming language should be used. The
accepted values for `data-lang` are `r` and `python`. There is also an optional
attribute `data-height` which can sets the height in `px` of the div (minimum
height is `300px`) or set the size according to the amount of sample code lines:
`data-height="auto"`.


### Pre-Exercise Code

Pre-exercise code is executed when the R/Python session is initialized. You can
use it to pre-load datasets, packages, etc. for students. The way to specify
this is by defining a `<code>` tag containing your initialization code and set
the `data-type` attribute to `pre-exercise-code` like this:

```html
<code data-type="pre-exercise-code">
	# This will get executed each time the exercise gets initialized
	b = 6
</code>
```

In our example we initialize the (rather useless) variable `b` with value `6`.



### Sample Code

To set the sample code that will be present initially in the code editor, a
`<code>` tag should be defined containing the sample code and the `data-type`
attribute should be set to `sample-code` like this:

```html
<code data-type="sample-code">
	# Create a variable a, equal to 5


	# Print out a


</code>
```

Our example simply shows a couple of comments together with some newlines. The
JavaScript library also takes care of stripping leading indentation so no need
to worry about that.



### Solution

To set the solution code, a `<code>` tag should be defined containing the
solution code and the `data-type` attribute should be set to `solution`
like this:

```html
<code data-type="solution">
	# Create a variable a, equal to 5
	a <- 5

	# Print out a
	print(a)
</code>
```



### Submission Correctness Test (SCT)

A Submission Correctness Test is used to check whether the code submitted by the
user properly solves the exercise. For detailed information on this you can look
at [the documentation for R](https://github.com/datacamp/testwhat) and at [the
documentation for Python](https://github.com/datacamp/pythonwhat). The way to
specify the SCT is by defining a `<code>` tag containing your SCT code and set
the `data-type` attribute to `sct` like this:

```html
<code data-type="sct">
	test_object("a")
	test_function("print")
	success_msg("Great job!")
</code>
```

In our example the first line checks whether the user declared the variable `a`
and whether its value matches that of the solution code. The second line checks
whether the `print` function is called and lastly a success message is specified
that will be shown to the user when the exercise is successfully completed.



### Hint

To specify a hint, a tag should be defined containing the hint and the
`data-type` attribute should be set to `hint` like this:

```html
<div data-type="hint">
    Use the assignment operator (<code><-</code>) to create the variable <code>a</code>.
</div>
```

It is possible for the hint to contain for instance `<code>` tags as is the case in our example.



### Other Options

- Add a `data-show-run-button` attribute to always show the "Run" button, so your visitors can try out the code without submitting it.
- Add a `data-no-lazy-loading` attribute to load all exercises as soon as the page is loaded, instead of waiting for the user to scroll down to them. This may cause performance issues, but can fix compatibility problems with iFrame-based pages.
- Add the following css to the styling of your page to hide the configuration code of the exercises until they are loaded:
```css
[data-datacamp-exercise] {
  visibility: hidden;
}
```



## How does it work?

`div`s with the `data-datacamp-exercise` attribute are converted into a minimal
version of DataCamp's learning interface (for the real deal, you can visit
[www.datacamp.com](https://www.datacamp.com/?utm_source=datacamp_light&utm_medium=readme&utm_term=the_real_deal)).
It contains a session manager that connects to DataCamp's servers to provide an
R or Python session as if you're working on your local system. The R and Python
computing environments feature the most popular packages:

- [See list of packages for R](http://documents.datacamp.com/default_r_packages.txt)
- [See list of packages for Python](http://documents.datacamp.com/default_python_packages.txt)

If you want to use a package that is not available, create an issue and we can
install it (it's not possible to install packages at runtime).






## Contributing

If you'd like to contribute, awesome! You can start by reading this section of
the readme to get an idea of the technical details of this project. For the most
part, it's structured as a standard React/Redux project (written in TypeScript)
so if you're not familiar with one of those, you might want to read up a bit.

To develop DataCamp Light, you'll need to run the app locally. This repository
includes some example exercises to test it on.

Get started by cloning this repository, installing the dependencies and starting
the development server. As you make changes, the page will reload with your new
code.

```
git clone https://github.com/datacamp/datacamp-light.git
cd datacamp-light
git checkout beta
npm i
npm start
```



### Dependencies

The `vendor/` folder includes minified code of some internal DataCamp packages
that are not hosted publicly right now.



### Testing

Please read these two documents before starting to implement any tests:
- [Writing tests in redux](http://redux.js.org/docs/recipes/WritingTests.html)
- [Writing tests for side effects](https://redux-observable.js.org/docs/recipes/WritingTests.html)

Test files are named as `{moduleName}.spec.js`.

#### Run tests

```bash
npm test
```

#### Reducers

Since a reducer is a pure function, it's not that complicated to test it. You
have to use a seed to create a mock state. Then you can pass it to the reducer
as argument along with the action you want to test.

#### Components

Use snapshot testing to make sure components don't change by accident (see
`src/components/Footer.spec.ts` for an example). Other tests can be done for
components that have logic inside them.

#### Middleware

Testing middleware is a bit more involved since they have side effects. You can
test Epics with the `rxjs-marbles` framework since they transform Observable
streams. See `src/autocomplete.spec.ts` for an example.



### DevOps

#### Formatting with Prettier

We use [Prettier](https://github.com/prettier/prettier) to keep formatting
consistent. This will format your files (JS, TS, CSS, JSON) on a pre-commit
hook. If you want, you can also call `prettier --write filename` to update a
file manually.

There are also plugins for editors, like
[`prettier-vscode`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
that can auto-format on save.

#### Code Quality: ESLint, TSLint, Stylelint

I recommend installing plugins for these checkers in your editor. TSLint and
Stylelint are also run in the development command, so you'll see their warnings
pop up there as well.

#### Commit Messages

We've been using [this commit message
convention](https://github.com/kazupon/git-commit-message-convention) because it
has emoji and emoji are :thumbsup:.

#### Continuous Integration

Development is primarily done on the [`development`
branch](https://github.com/datacamp/datacamp-light/tree/development).

Commits to the `development` branch trigger a build on the DataCamp development
environment and produce a build here:

```
https://cdn.datacamp.com/dcl-react-dev.js.gz
```

Next, commits to the [`beta` branch](https://github.com/datacamp/datacamp-light/tree/beta)
 push a release to the staging environment:

```
https://cdn.datacamp.com/dcl-react-staging.js.gz
```

Finally, when we create a release, an update is pushed to the production
environment. This should be a stable version of DataCamp Light:

```
https://cdn.datacamp.com/dcl-react.js.gz
```

Commits to this
branch trigger a build that is deployed on the DataCamp Dev environment. Commits
to the main branch, `beta`, are built and deployed to staging. When a release is
created, that build is deployed to production.

#### Packages used that you might want to know about

- [TypeScript](https://www.typescriptlang.org/), of course. Make sure you
  install an appropriate plugin for your editor, if it doesn't ship with one.

- [redux-observable](https://github.com/redux-observable/redux-observable/) for observable middleware
- [typescript-fsa](https://github.com/aikoven/typescript-fsa) for easy, type-safe action creators
- [typescript-fsa-reducers](https://github.com/dphilipson/typescript-fsa-reducers) for super-clean reducers
