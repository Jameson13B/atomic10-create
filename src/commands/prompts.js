import { confirm, select } from "@inquirer/prompts"

export const getLanguage = async () => {
  return await select({
    message: "Language: JavaScript or TypeScript?",
    default: "ts",
    choices: [
      {
        key: "t",
        name: "TypeScript",
        value: "react-ts",
      },
      {
        key: "j",
        name: "JavaScript",
        value: "react",
      },
    ],
  })
}
export const getShouldFormat = async () => {
  return await confirm({
    message: "💄 ESLint and Prettier: Code quality?",
    default: true,
  })
}
export const getUseVanillaExtract = async () => {
  return await confirm({
    message: "🧁 Vanilla Extract: CSS-in-TS styling?",
    default: true,
  })
}
export const getUseFirebase = async () => {
  return await confirm({
    message: "🔥 Firebase: Database and Authentication?",
    default: false,
  })
}
export const getUseZustand = async () => {
  return await confirm({
    message: "🐻 Zustand: State management?",
    default: false,
  })
}
export const getUseGSAP = async () => {
  return await confirm({
    message: "💃 GSAP: Animation library?",
    default: false,
  })
}
export const getUseAntDesign = async () => {
  return await confirm({
    message: "🧱 Ant Design: React UI library?",
    default: false,
  })
}
export const getUseTailwind = async () => {
  return await confirm({
    message: "🎨 Tailwind: Utility-first CSS framework?",
    default: false,
  })
}
