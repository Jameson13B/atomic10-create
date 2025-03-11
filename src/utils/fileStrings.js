// Base Strings
export const initialApp = `
function App() {

  return (
    <>
      <h1>Atomic10 Create Stack</h1>
    </>
  )
}

export default App
`
export const rootStyle = `#root {
  max-width: 1280px;
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
}
`

// Firebase Strings
export const firebase = `import { initializeApp } from "firebase/app"
import { getFirestore, arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const currentTimestamp = () => serverTimestamp()
export const addArray = (item: unknown) => arrayUnion(item)
export const removeArray = (item: unknown) => arrayRemove(item)
`
export const firebaseEnv = `VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=`

// ESLint Strings
export const eslintrc = `module.exports = {
  extends: ["react-app", "react-app/jest", "prettier"],
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
}`

// Vanilla Extract Strings
export const vanillaExtractStyles = `import { createGlobalTheme, globalStyle } from "@vanilla-extract/css"

export const vars = createGlobalTheme("*", {
  color: {
    primary: "blue",
    secondary: "red",
  },
})

globalStyle("*", {
  boxSizing: "border-box",
})
globalStyle("body", {
  margin: 0,
  display: "flex",
  placeItems: "center",
  minWidth: "320px",
  minHeight: "100vh",
})
globalStyle("#root", {
  margin: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "320px",
  minHeight: "100vh",
})

export default vars
`
export const vanillaExtractPluginImport = `import "./theme.css.ts"\n`
export const vanillaExtractPluginImport2 = `import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"\n`
export const vanillaExtractPlugin = `$1vanillaExtractPlugin(), `

// Zustand Strings
export const zustandState = `import { create } from "zustand"

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state: CounterState) => ({ count: state.count + 1 })),
  decrement: () => set((state: CounterState) => ({ count: state.count - 1 })),
}))`
export const zustandImport = `import { useCounterStore } from './state'\n`
export const zustandUsage = `  const { count, increment, decrement } = useCounterStore()\n`
export const zustandUsage2 = `      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>\n`

// GSAP Strings
export const gsapImport = `import { gsap } from "gsap"\nimport { useGSAP } from "@gsap/react"\n`
export const gsapUsage = `  useGSAP(() => gsap.fromTo("h1", { autoAlpha: 0 }, { autoAlpha: 1 }), {
    dependencies: [],
    scope: "root",
  })\n`

// Ant Design Strings
export const antdImport = `import { FloatButton } from "antd"\n`
export const antdImport2 = `import { AntDesignOutlined } from '@ant-design/icons'\n`
export const antdUsage = `      <FloatButton
        onClick={() => alert("Ant Design Float Button Clicked")}
        shape="square"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<AntDesignOutlined />}
      />
`

// Tailwind Strings
export const tailwindImport = `import tailwindcss from '@tailwindcss/vite'\n`
export const tailwindUsage = `$1tailwindcss(), `
