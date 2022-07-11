import chalk from 'chalk'
import path from 'path'
import { execa } from 'execa'
import fse from 'fs-extra'

const projectTemplates = {
  NODE_PROJECT: {
    name: 'NodeJS project',
    path: 'nodejs-project'
  }
}

const copyTemplateFiles = async (options = {}) => {
  const { template, target } = options

  if (!fse.existsSync(target)) {
    throw new Error(`Target path "${target}" does not exist.`)
  }

  if (await fse.readdirSync(target).length) {
    throw new Error(`Target path "${target}" should be an empty directory.`)
  }

  const templatePath = projectTemplates[template].path
  const fullPathName = new URL(import.meta.url).pathname

  const templateDirectory = path.resolve(
    fullPathName.substr(0, fullPathName.lastIndexOf('/')),
    '../templates/',
    templatePath
  )

  return fse.copySync(templateDirectory, target)
}

const initGit = async (targetDirectory) => {
  const result = await execa('git', ['init'], {
    cwd: targetDirectory
  })

  if (result.failed) {
    throw new Error('Failed to initialize git.')
  }

  return true
}

const npmInstall = async (targetDirectory) => {
  const result = await execa('npm', ['install'], {
    cwd: targetDirectory
  })

  if (result.failed) {
    throw new Error('Failed to install npm dependencies.')
  }

  return true
}

const createProject = async (options) => {
  const { target, template, git, install } = options

  try {
    await copyTemplateFiles({ template, target })
    console.log('- creating project ->', chalk.green('succeeded'))
  } catch (error) {
    console.log('- creating project ->', chalk.red('failed'))

    throw error
  }

  if (git) {
    try {
      await initGit(target)
      console.log('- initializing git ->', chalk.green('succeeded'))
    } catch (error) {
      console.log('- initializing git ->', chalk.red('failed'))

      throw error
    }
  }

  if (install) {
    try {
      await npmInstall(target)
      console.log('- installing npm dependencies ->', chalk.green('succeeded'))
    } catch (error) {
      console.log('- installing npm dependencies ->', chalk.red('failed'))

      throw error
    }
  }

  console.log()
}

export {
  projectTemplates,
  createProject
}
