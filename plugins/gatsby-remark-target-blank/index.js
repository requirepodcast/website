const visit = require("unist-util-visit")

module.exports = ({ markdownAST }) => {
  visit(markdownAST, "link", (node) => {
    const url = node.url
    const text = node.children[0].value

    const html = `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
    node.type = "html"
    delete node.children
    delete node.url
    node.value = html
  })

  return markdownAST
}
