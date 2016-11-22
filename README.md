# console-notifier [![Build Status](https://travis-ci.org/gemini-testing/console-notifier.svg?branch=master)](https://travis-ci.org/gemini-testing/console-notifier)

Plugin for [gemini](https://github.com/gemini-testing/gemini) and [hermione](https://github.com/gemini-testing/hermione) to log some information to a console after tests finished.

## Install

```bash
$ npm install console-notifier
```

## Usage

### gemini

Add the plugin to your configuration file:

```js
module.exports = {
    system: {
        plugins: {
            'console-notifier/gemini': {
                logs: [
                    'first-log',
                    {text: 'second-log'}, // revealed variant of the previous example
                    {on: 'success', text: 'third-log'}, // show log only if tests passed
                    {on: 'fail', text: 'fourth-log'}, // show log only if tests failed
                    {text: 'fifth-log', color: 'bold.red'} // show colored log; feature uses methods from module `chalk`
                ]
            }
        }
    }
};
```

### hermione

Add the plugin to your configuration file:

```js
module.exports = {
    plugins: {
        'console-notifier/hermione': {
            logs: [
                'first-log',
                {text: 'second-log'},
                {on: 'success', text: 'third-log'},
                {on: 'fail', text: 'fourth-log'},
                {text: 'fifth-log', color: 'bold.red'}
            ]
        }
    }
};
```
