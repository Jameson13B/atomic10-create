import chalk from "chalk"
import { spawnSync } from "child_process"

export const exec = (name, commands, verbose = false) => {
  console.log(chalk.cyan.bold(` ⚛ Adding ${name} to the rocket...`))
  try {
    commands.forEach((cmd) => {
      typeof cmd === "string"
        ? spawnSync(cmd, { shell: true, stdio: verbose ? "inherit" : "pipe" })
        : cmd()
    })
    console.log(chalk.green.bold(`  ✔ Finished adding ${name} to the rocket!`))
  } catch (error) {
    console.error(
      chalk.red.bold(`Error adding ${name} to the rocket: ${error}\n`)
    )
  }

  // Return a promise
  return new Promise((resolve, _) => {
    resolve()
  })
}
export const execCustom = (
  startStr,
  commands,
  endStr,
  errStr,
  verbose = false
) => {
  console.log(chalk.cyan.bold(` ⚛ ${startStr}`))
  try {
    commands.forEach((cmd) => {
      typeof cmd === "string"
        ? spawnSync(cmd, { shell: true, stdio: verbose ? "inherit" : "pipe" })
        : cmd()
    })
    console.log(chalk.green.bold(`  ✔ ${endStr}`))
  } catch (error) {
    console.error(chalk.red.bold(`${errStr}: ${error}\n`))
  }

  // Return a promise
  return new Promise((resolve, _) => {
    resolve()
  })
}
