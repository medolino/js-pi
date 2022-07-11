#!/usr/bin/env node
import chalk from 'chalk'
import path from 'path'

import { parseArguments, promptForMissingOptions } from '../src/cli.js'
import { createProject } from '../src/project.js'

const initProject = async () => {
  console.log(chalk.bgBlack('---------------------------'))
  console.log(chalk.bgBlack(` ${chalk.bold('JS Project Init')}           `))
  console.log(chalk.bgBlack('---------------------------\n'))

  console.log('Initializing new project:\n')
  const parsedArgs = parseArguments(process.argv)

  const options = { ...parsedArgs, ...await promptForMissingOptions(parsedArgs) }

  options.target = path.resolve(options.target)

  console.log('\n-------------------------------------------\n')

  try {
    await createProject(options)
  } catch (error) {
    console.log()
    console.log(chalk.red(error.message))
    console.log()
  }
}

initProject()
