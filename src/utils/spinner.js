import ora from "ora"
import chalk from "chalk"

export const installSpinner = (variables) => {
  return ora({
    text: chalk.cyan.bold(
      "Installing " +
        variables.language +
        (variables.shouldFormat ? ", ESLint and Prettier" : "") +
        (variables.useVanillaExtract ? ", Vanilla Extract" : "") +
        (variables.useTailwind ? ", Tailwind CSS" : "") +
        (variables.useAntDesign ? ", Ant Design" : "") +
        (variables.useZustand ? ", Zustand" : "") +
        (variables.useFirebase ? ", Firebase" : "") +
        (variables.useGSAP ? ", GSAP" : "") +
        "...\n"
    ),
    spinner: "earth",
    prefixText: "\n",
  })
}

// Spinner usage example
// import { installSpinner } from "../src/utils/spinner.js"
// const spinner = installSpinner({
//   language,
//   shouldFormat,
//   useVanillaExtract,
//   // useTailwind,
//   useAntDesign,
//   useZustand,
//   useFirebase,
//   useGSAP,
// })
