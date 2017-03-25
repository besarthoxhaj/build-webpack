## Start

For a general idea look at `concept` folder, `concept/main.js` has a simple
example of what `webpack` output file looks like.

## Webpack

The best way to understand how something works is to look at the source code.
Pull down and run the tests of the real webpack:

```
$ git clone https://github.com/webpack/webpack.git
$ cd webpack
$ npm install -g yarn
$ yarn install
$ yarn link
$ yarn link webpack
$ yarn test

# this will run all the tests:
# 7061 passing (9m)
# 77 pending
# 1 failing
```

## Process

Following a simple breakdown on what file it's run:

```
$ yarn run try
> webpack lib/index.js dist/bundle.js
# npm looks at ./node_modules/.bin/ for any `webpack` executable
> ./node_modules/.bin/webpack lib/index.js dist/bundle.js
# `./node_modules/.bin/webpack` is a symbolic link to `./node_modules/webpack/bin/webpack.js`
> ./node_modules/webpack/bin/webpack.js lib/index.js dist/bundle.js
```

Let's study `./node_modules/webpack/bin/webpack.js`.

```
# require yargs to process the arguments and options
# create the `options` variable
# when running `$ webpack lib/index.js dist/bundle.js` these are the opts:
{
  bail: false,
  profile: false,
  output: {
    filename: 'bundle.js',
    path: '/Users/besartshyti/Projects/build-webpack/dist'
  },
  entry: {
    main: '/Users/besartshyti/Projects/build-webpack/lib/index.js'
  },
  context: '/Users/besartshyti/Projects/build-webpack'
}
# require `./node_modules/webpack/lib/webpack.js` and invoke it with `options`
> compiler = webpack(options);
# `webpack(options)` returns an object with a `run` method
> compiler.run(compilerCallback);
# run the real compiler
```
