## multi-prompt [![Build Status](https://travis-ci.org/joegesualdo/multi-prompt-node.svg?branch=master)](https://travis-ci.org/joegesualdo/multi-prompt-node)
> Multiple command line prompts.

## Install
```
$ npm install --save @joegesualdo/multi-prompt-node
```

![demo](https://github.com/joegesualdo/multi-prompt-node/raw/master/demo.gif)

## Usage
```javascript
import MultiPrompt from '@joegesualdo/multi-prompt-node';

const questions = [
  {
    prompt: `What's your name?`,
  },
  {
    prompt: `How old are you?`,
  },
]

new MultiPrompt(questions)
.on('done', result => {
  console.log(result)
})
.begin()
```

## Test
```
$ npm test
```
## API
### `MultiPrompt(prompts)`
> Instantiates a new prompt

#### Params
| Name |   Type  | Default |   Description    |
|------|---------|---------|------------------|
| prompts | `Array<Object>` |   ` `   | An object representing properties of a prompt

#### Example Promp Object:
```
    identifier: 'who',
    prompt: ` Where do you live?`,
    dependent: {
      question: 'language',
      answers: [
        'ruby'
      ]
    },
    validation: (answer) => {
      return ['node', 'ruby'].indexOf(answer) !== -1;
    }
    onDone: (answer) => {
      return 'I am no one :-)'
    }
```

Returns: `multiPrompt`

### `multiPrompt.begin()`
> Starts the prompt

```javascript
import prompt from '@joegesualdo/multi-prompt-node'

const questions = [
  {
    prompt: `What's your name?`,
  },
  {
    prompt: `How old are you?`,
  },
]

new MultiPrompt(questions)
.on('done', result=> {
  console.log(result)
})
.begin()
```

### `prompt.on(type, fn)`
> Sets lifecycle methods

#### Params
| Name |   Type     | Default |   Description      | Possible values |
|------|------------|---------|--------------------|-----------------|
| type | `String`   |  `N/A`  | The lifecycle name | `done` |
| fn   | `Function` |  `N/A`  | Function to run    | `N/A`|

```javascript
import prompt from '@joegesualdo/multi-prompt-node'

const questions = [
  {
    prompt: `What's your name?`,
  },
  {
    prompt: `How old are you?`,
  },
]

new MultiPrompt(questions)
.on('done', result=> {
  console.log(result)
})
.begin()
```
```
## Build
```
$ npm run build
```

## Related
- [prompt-node](https://github.com/joegesualdo/prompt-node) - Command line prompt

## License
MIT © [Joe Gesualdo]()
