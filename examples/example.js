var MultiPrompt = require('./../dist').default
var chalk = require('chalk')

function getQuestions(username, projectName, isCli, isReact) {
  let questions = [
    {
      identifier: 'moduleName',
      prompt: `${chalk.green('?')} What do you want to name your module? (${projectName})`,
      onDone: (answer, pkg) => {
        return answer || projectName;
      },
    },
    {
      identifier: 'githubRepoName',
      prompt: `${chalk.green('?')} What do you want to name your github repo? (${username}/<REPO_NAME>)`,
      onDone: (answer, pkg) => {
        return `${username}/${answer}`;
      },
    },
    {
      identifier: 'version',
      prompt: `${chalk.green('?')} What version is it? (0.0.1)`,
      onDone: (answer, pkg) => {
       return answer || "0.0.1";
      },
    },
    {
      identifier: 'description',
      prompt: `${chalk.green('?')} What is a description of this module?`,
      onDone: (answer, pkg) => {
        return answer;
      },
    },
    {
      identifier: 'entry',
      prompt: `${chalk.green('?')} What file should be used for the entry point? (${(isCli ? './dist/cli.js' : './dist/index.js')})`,
      onDone: (answer, pkg) => {
        let a;
        if (isCli) {
          a = answer || './dist/cli.js';
        } else {
          a = answer || './dist/index.js';
        }
        return a;
      },
    },
    {
      identifier: 'testCommand',
      prompt: `${chalk.green('?')} What is the test command? ($ ${isReact ? 'ava-react test.js' : 'ava test.js'})`,
      onDone: (answer, pkg) => {
        let defaultCommand = 'npm run build && ./node_modules/ava/cli.js -v test.js'
        if (isReact) {
          defaultCommand = './node_modules/@joegesualdo/ava-react/cli.js test.js'
        }
        return answer || defaultCommand;
      },
    },
    {
      identifier: 'keywords',
      prompt: `${chalk.green('?')} What keywords describe this module?`,
      onDone: (answer, pkg) => {
        // split and remove empty strings
        return answer.split(',').filter((e) => { return e });
      },
    },
    {
      identifier: 'authorName',
      prompt: `${chalk.green('?')} What's the author's name`,
      onDone: (answer, pkg) => {
        return answer;
      },
    },
    {
      identifier: 'authorEmail',
      prompt: `${chalk.green('?')} What's the author's email`,
      onDone: (answer, pkg) => {
        return answer;
      },
    },
    {
      identifier: 'authorUrl',
      prompt: `${chalk.green('?')} What's the author's url?`,
      onDone: (answer, pkg) => {
        return answer;
      },
    },
    {
      identifier: 'license',
      prompt: `${chalk.green('?')} What license do you want to include? (MIT)`,
      onDone: (answer, pkg) => {
       return answer || 'MIT';
      },
    },
    {
      identifier: 'devDependencies',
      prompt: `${chalk.green('?')} What are the devDependencies?`,
      onDone: (answer, pkg) => {
        let devDependencies = {};
        // split and remove empty strings
        answer.split(",").filter((e) => { return e }).forEach((dep) => {
          devDependencies[dep] = '*';
        });
        devDependencies['ava'] = '^0.15.2';
        devDependencies['distify-cli'] = '0.0.13';
        if (isReact) {
          devDependencies['react-addons-test-utils'] = "^15.1.0"
          devDependencies['enzyme'] = "^2.3.0";
          devDependencies['@joegesualdo/ava-react'] = "^0.0.4";
        }
        return devDependencies;
      },
    },
    {
      identifier: 'dependencies',
      prompt: `${chalk.green('?')} What are the dependencies?`,
      onDone: (answer, pkg) => {
        let dependencies = {};
        // split and remove empty strings
        answer.split(',').filter((e) => { return e }).forEach((dep) => {
          dependencies[dep] = '*';
        });
        if (isReact) {
          dependencies['react'] = "^15.1.0";
          dependencies['react-dom'] = "^15.1.0";
        }
        return dependencies;
      },
    },
  ];

  if (isCli) {
    questions.push(
      {
        identifier: 'executable',
        prompt: `${chalk.green('?')} What do you want the cli exectable to be? (${projectName})`,
        onDone: (answer, pkg) => {
          let bin = {}
          let name = answer || projectName
          bin[name] = './dist/cli.js';
          return bin;
        },
      }
    );
  }
  return questions;
}

// const questions = getQuestions("joegesualdo", 'coolproject', false, false)
const questions = [
  {
    identifier: 'language',
    prompt: `${chalk.green('?')} What's your name?`,
    // validation: (answer) => {
    //   return ['node', 'ruby'].indexOf(answer) !== -1;
    // }
    // onDone: (answer) => {
    //   return !(answer === undefined)
    // }
  },
  {
    // identifier: 'who',
    prompt: `${chalk.green('?')} How old are you?`,
    // dependent: { question: 'language', answers: ['node']},
    // validation: (answer) => {
    //   return Number(answer) > 1
    // },
    onChange: (oldStr, newStr) => {
    },
    onBackspace: () => {
    },
    // onDone: (answer) => {
    //   return 'I am no one :-)'
    // },
    onValidationError: (answer) => {
      // process.stdout.write('validation error!')
    }
  },
  {
    // identifier: 'who',
    prompt: `${chalk.green('?')} Where do you live?`,
    // dependent: { question: 'language', answers: ['ruby']},
    // onDone: (answer) => {
    //   return 'I am no one :-)'
    // }
  },
  {
    // identifier: 'who',
    prompt: `${chalk.green('?')} What's your favorite color?`,
    // onDone: (answer) => {
    //   return 'I am no one :-)'
    // }
  },
  // {
  //   // identifier: 'who',
  //   prompt: `${chalk.green('?')} Do you want to sync with Github?`,
  //   // onDone: (answer) => {
  //   //   return 'I am no one :-)'
  //   // }
  // }
]

new MultiPrompt(questions)
.on('done', result => {
  console.log('')
  console.log(result)
})
.begin()
// .then((result) => {
//   console.log('')
//   console.log(result)
// })

// askQuestions(questions)
// .then((result) => {
//   console.log('')
//   console.log(result)
// })
