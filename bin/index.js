#!/usr/bin/env node
import { program } from "commander"
import figlet from "figlet"
import chalk from "chalk"

import { exec, execCustom } from "../src/commands/exec.js"
import { create, rmSync, update } from "../src/commands/fs.js"
import * as prompts from "../src/commands/prompts.js"
import * as fileStrings from "../src/utils/fileStrings.js"

const EMPTY_LINE = /^\s*$/m
const START_OF_PLUGINS_ARRAY = /(plugins:\s*\[)/
const INSIDE_APP_FUNCTION = /(?<=function App\(\) \{\n)/
const JSX_BODY = /(?<=<h1>Atomic10 Create Stack<\/h1>\n)/
const END_OF_JSX_BODY = /(?=^\s{4}<\/>)/m
const defaultStack = {
  language: "react-ts",
  shouldFormat: true,
  useVanillaExtract: true,
  useFirebase: false,
  useZustand: true,
  useGSAP: true,
  useAntDesign: false,
  useTailwind: false,
}

program
  .version("1.0.0")
  .description("Quickly create a new project with the Atomic10 stack")
  .option("-c, --custom", "View menu of custom options")
  .option("-v, --verbose", "Verbose output")
  .argument("<project>", "name of the project")
  .action(async (project, options) => {
    // Print the Atomic10 Create logo
    console.log(
      chalk.magentaBright.bold(figlet.textSync("Atomic10 Create" + "\n"))
    )

    // Get the user's input if custom
    if (options.custom) {
      // Get the user's input
      defaultStack.language = await prompts.getLanguage()
      defaultStack.shouldFormat = await prompts.getShouldFormat()
      defaultStack.useVanillaExtract = await prompts.getUseVanillaExtract()
      defaultStack.useFirebase = await prompts.getUseFirebase()
      defaultStack.useZustand = await prompts.getUseZustand()
      defaultStack.useGSAP = await prompts.getUseGSAP()
      defaultStack.useAntDesign = await prompts.getUseAntDesign()
      defaultStack.useTailwind = !defaultStack.useVanillaExtract
        ? await prompts.getUseTailwind()
        : false
    }

    // 1. Create Vite project, remove unnecessary files, and create the initial App.tsx and styles.
    try {
      console.log("")
      await execCustom(
        "Creating the rocket's body...",
        [
          `npm create vite@latest ${project} -- --template ${defaultStack.language}`,
          `sed -i '' '3d' ${project}/src/main.tsx`,
          () => {
            rmSync([
              `${project}/src/assets`,
              `${project}/public/vite.svg`,
              `${project}/src/App.css`,
              `${project}/src/index.css`,
            ])
            create(
              `${project}/src/App.${
                defaultStack.language === "react-ts" ? "tsx" : "jsx"
              }`,
              fileStrings.initialApp
            )
            if (!defaultStack.useVanillaExtract && !defaultStack.useTailwind) {
              update(
                `${project}/src/styles.css`,
                [EMPTY_LINE],
                [fileStrings.rootStyle]
              )
            }
          },
        ],
        "Finished the rocket's body!",
        "Error creating project",
        options.verbose
      )
    } catch (error) {
      console.error("Error creating project:", error)
    }

    // 2. Install requested packages
    if (defaultStack.shouldFormat) {
      // ESLint & Prettier
      await exec(
        "correct formats and rules",
        [
          `cd ${project}/ && npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin`,
          `cd ${project}/ && npm install eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks`,
          () => {
            try {
              create(`${project}/.eslintrc.js`, fileStrings.eslintrc)
            } catch (error) {
              console.error("ESLint Error:", error)
            }
          },
        ],
        options.verbose
      )
    }
    if (defaultStack.useVanillaExtract) {
      // Vanilla Extract
      await exec(
        "style system",
        [
          `cd ${project}/ && npm install -D @vanilla-extract/css @vanilla-extract/vite-plugin`,
          () => {
            try {
              // Update the vite.config.ts, App.tsx, and create src/styles.css.ts
              update(
                `${project}/vite.config.ts`,
                [EMPTY_LINE, START_OF_PLUGINS_ARRAY],
                [
                  fileStrings.vanillaExtractPluginImport2,
                  fileStrings.vanillaExtractPlugin,
                ]
              )
              update(
                `${project}/src/App.${
                  defaultStack.language === "react-ts" ? "tsx" : "jsx"
                }`,
                [EMPTY_LINE, EMPTY_LINE, INSIDE_APP_FUNCTION],
                [
                  fileStrings.vanillaExtractPluginImport,
                  fileStrings.vanillaExtractDarkModeImport,
                  fileStrings.vanillaExtractDarkModeUsage,
                ]
              )
              create(
                [
                  `${project}/src/theme.css.ts`,
                  `${project}/src/styles.css.ts`,
                  `${project}/src/useDarkMode.tsx`,
                ],
                [
                  fileStrings.vanillaExtractTheme,
                  fileStrings.vanillaExtractStyles,
                  fileStrings.useDarkMode,
                ]
              )
            } catch (error) {
              console.error("Vanilla Extract Error:", error)
            }
          },
        ],
        options.verbose
      )
    }
    if (defaultStack.useFirebase) {
      // Initialize Firebase
      await exec(
        "database and authentication",
        [
          `cd ${project}/ && npm install -D firebase`,
          () => {
            try {
              create(`${project}/src/firebase.ts`, fileStrings.firebase)
              create(`${project}/.env`, fileStrings.firebaseEnv)
            } catch (error) {
              console.error("Firebase Error:", error)
            }
          },
        ],
        options.verbose
      )
      console.log(
        chalk.yellowBright.bold(`    ⚠ Add your database credentials to .env`)
      )
    }
    if (defaultStack.useZustand) {
      await exec(
        "storage system",
        [
          `cd ${project}/ && npm install zustand`,
          () => {
            try {
              create(`${project}/src/state.ts`, fileStrings.zustandState)
              update(
                `${project}/src/App.tsx`,
                [EMPTY_LINE, INSIDE_APP_FUNCTION, JSX_BODY],
                [
                  fileStrings.zustandImport,
                  fileStrings.zustandUsage,
                  fileStrings.zustandUsage2,
                ]
              )
            } catch (error) {
              console.error("Zustand Error:", error)
            }
          },
        ],
        options.verbose
      )
    }
    if (defaultStack.useGSAP) {
      // Initialize GSAP
      await exec(
        "animation system",
        [
          `cd ${project}/ && npm install -D gsap @gsap/react`,
          () => {
            try {
              update(
                `${project}/src/App.tsx`,
                [EMPTY_LINE, INSIDE_APP_FUNCTION],
                [fileStrings.gsapImport, fileStrings.gsapUsage]
              )
            } catch (error) {
              console.error("GSAP Error:", error)
            }
          },
        ],
        options.verbose
      )
    }
    if (defaultStack.useAntDesign) {
      await exec(
        "modular system",
        [
          `npm install antd --save`,
          () => {
            update(
              `${project}/src/App.tsx`,
              [EMPTY_LINE, EMPTY_LINE, END_OF_JSX_BODY],
              [
                fileStrings.antdImport,
                fileStrings.antdImport2,
                fileStrings.antdUsage,
              ]
            )
          },
        ],
        options.verbose
      )
    }
    if (defaultStack.useTailwind) {
      await exec(
        "alternative livery",
        [
          `cd ${project}/ && npm install tailwindcss @tailwindcss/vite`,
          () => {
            try {
              update(
                `${project}/vite.config.ts`,
                [EMPTY_LINE, START_OF_PLUGINS_ARRAY],
                [fileStrings.tailwindImport, fileStrings.tailwindUsage]
              )
            } catch (error) {
              console.error("Tailwind Error:", error)
            }
          },
        ],
        options.verbose
      )
    }

    // 3. Finish and instructions
    console.log(
      chalk.green(
        `\n🚀 Your rocket, ${chalk.bold(project)}, is ready for launch!`
      )
    )
    console.log(
      chalk.cyan(`    Launch your rocket with: 
      1. cd ${project}
      2. npm install
      3. npm run dev
      `)
    )
  })

// Listen for Cmd + C to cancel the setup
process.on("uncaughtException", (error) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log(
      chalk.redBright.bold("\n   🚀 Setup Cancelled: Stay Irie! ✌️\n")
    )
  } else {
    throw error
  }
})

program.parse(process.argv)

// TODO:
// Style the default App.tsx file
// Add a command that initializes git on the project
// Add a command that installs a new package from the stack
// Script to add css reset
