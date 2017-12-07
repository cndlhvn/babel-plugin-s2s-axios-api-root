# babel-plugin-s2s-axios-api-root

> generate axios api root

Here is the sample repository using this s2s plugin.
[https://github.com/cndlhvn/s2s-redux-actions-sample](https://github.com/cndlhvn/s2s-redux-actions-sample)

## Install

```
$ yarn add --dev babel-plugin-s2s-axios-api-root
```

## s2s.config.js

s2s-axios-api-root plugin watch the `src/api/(?!.*index).*\.js` files

```js
module.exports = {
  plugins: [
    {
      test: /src\/api\/(?!.*index).*\.js/,
      output: "index.js",
      plugin: ['s2s-axios-api-root',
      { input: 'src/api/*.js', output: "src/api/index.js" }]
    }
  ]
}
```
## Start s2s

Start the s2s with yarn command

`yarn run s2s`

## Usage

#### When create a axios api file

When you create a `src/api/*.js`, this plugin inserts into index.js automatically.

For example you create a `src/api/user.js`. It inserts into index.js

#### Out:

```js
import * as user from "./user";
const api = {
  ...user
};
export default api;
```

# Test

This plugin has two type of test files. \
First is babel plugin main test file named `test.js` on root direcotry. \
Next is `test/*.js` that is test target files.

Run this command.

` npm run test`

Test will run and you can see what happen.
