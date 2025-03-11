import { createGlobalTheme, globalStyle } from "@vanilla-extract/css"

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
  placeItems: "center",
  minWidth: "320px",
  minHeight: "100vh",
})

export default vars
