import inquirer from 'inquirer'
import arg from 'arg'

import { projectTemplates } from './project.js'

const AVAILABLE_TEMPLATES = Object.entries(projectTemplates).map(([key, { name }]) => {
  return {
    key,
    name,
    value: key
  }
})

const parseArguments = (rawArgs) => {
  const args = arg(
    {
      // types
      '--git': Boolean,
      '--install': Boolean,
      '--target': String,
      // aliases
      '-g': '--git',
      '-y': '--yes',
      '-t': '--target'
    }
  )

  return {
    git: args['--git'],
    install: args['--install'],
    target: args['--target']
  }
}

const promptForMissingOptions = (parsedOptions) => {
  const questions = {
    target: {
      type: 'input',
      name: 'target',
      message: 'Enter target path',
      default: './'
    },
    template: {
      type: 'list',
      name: 'template',
      message: 'Choose a project template',
      choices: AVAILABLE_TEMPLATES,
      default: projectTemplates.NODE_PROJECT
    },
    git: {
      type: 'confirm',
      name: 'git',
      message: 'Should a git be initialized?',
      default: false
    },
    install: {
      type: 'confirm',
      name: 'install',
      message: 'Should npm install be executed?',
      default: true
    }
  }

  const questionsToAsk = Object.entries(questions)
    .filter(([questionName]) => typeof (parsedOptions?.[questionName]) === 'undefined')
    .map(([, inqQuestion]) => inqQuestion)

  return inquirer.prompt(questionsToAsk)
}

export {
  parseArguments,
  promptForMissingOptions
}
