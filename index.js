import Prompt from '@joegesualdo/prompt-node';
import PromiseQueue from '@joegesualdo/promise-queue';
import stripAnsi from 'strip-ansi'
import indentString from '@joegesualdo/indent-string'

class MultiPrompt {
  constructor(prompts = [], {
    indent = 2,
  } = {}) {
    this.prompts = prompts;
    this.indent = indent;
    this.onDone = () => {};
  }
  addPrompt(prompt) {
    this.prompts.push(prompt);
  }
  on(type, fn) {
    switch (type) {
      case 'done':
        this.onDone = fn;
        break;
      default:
    }

    return this;
  }

  begin() {
    const instance = this;
    return new Promise((resolve, reject) => {
      const promises = instance.prompts.map((question) => {
        return (results) => {
          return new Promise((resolve, reject) => {
            // Helpers =====
            function isQuestionTrue(results, question) {
              // TODO: add options for no (false, no, n)
              return (
                question.dependent.answers.some((trueAnswer) => {
                  return results[question.dependent.question].answer === trueAnswer;
                })
              )
            }
            function isDependentOnAnotherQuestion(question) {
              return question.dependent !== undefined
            }

            if (!isDependentOnAnotherQuestion(question) || isQuestionTrue(results, question)) {
            // }
              // prompt(question.prompt)
              let opts = {}
              if (question.validation) {
                opts.validation = question.validation
              }
              new Prompt(indentString(question.prompt, instance.indent), {validation: question.validation})
              .on('validationError', (answer) => {
                if(question.validation && question.onValidationError) {
                  question.onValidationError(answer)
                }

              })
              .on('backspace', () => {
                if(question.onBackspace) {
                  question.onBackspace()
                }
              })
              .on('change', (oldStr, newStr ) => {
                if(question.onChange) {
                  question.onChange(oldStr, newStr)
                }
              })
              .on('done', answer => {
                const identifier = question.identifier || stripAnsi(question.prompt);
                let result;
                if (question.onDone) {
                  result = question.onDone(answer);
                }

                results[identifier] = {
                  prompt: stripAnsi(question.prompt),
                  answer: result || answer,
                }

                resolve(results);
              })
              .begin()
            } else {
              resolve(results);
            }
          });
        };
      });

      const promiseQueue = new PromiseQueue(promises);

      promiseQueue.run()
      .then((qa) => {
        instance.onDone(qa);
        resolve(qa);
      });
    });
  }
}

export default MultiPrompt;

