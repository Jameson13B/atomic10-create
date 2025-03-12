import fs from "fs"

/**
 * Create a file
 * @param {string} file - The file to create
 * @param {string} content - The content to write to the file
 */
export const create = (file, content) => {
  Array.isArray(file) && Array.isArray(content)
    ? file.forEach((f, i) => fs.writeFileSync(f, content[i], "utf8"))
    : fs.writeFileSync(file, content, "utf8")
}

/**
 * Update a file
 * @param {string} file - The file to update
 * @param {RegExp | RegExp[]} from - The string or strings to replace
 * @param {string | string[]} to - The string or strings to replace with
 */
export const update = (file, from, to) => {
  let content = fs.readFileSync(file, "utf8")

  Array.isArray(from) && Array.isArray(to)
    ? from.forEach((pattern, i) => (content = content.replace(pattern, to[i])))
    : content.replace(from, to)

  fs.writeFileSync(file, content, "utf8")
}

/**
 * Remove a file or directory
 * @param {string | string[]} file - The file or files to remove
 */
export const rmSync = (file) =>
  typeof file === "string"
    ? fs.rmSync(file, { recursive: true, force: true })
    : file.forEach((f) => fs.rmSync(f, { recursive: true, force: true }))
