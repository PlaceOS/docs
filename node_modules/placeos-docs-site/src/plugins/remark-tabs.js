const visit = require('unist-util-visit')
const u = require('unist-builder')
const is = require('unist-util-is')
const zone = require('mdast-zone')
const heading = require('mdast-util-heading-range')
const stringify = require('mdast-util-to-string')
const Slugger = require('github-slugger')

// Insert an import node to a mdast tree
const injectImport = (tree, value) => {
  let seen = false
  visit(tree, 'import', node => is(node, {value}) ? seen = true : null)
  seen || tree.children.push(u('import', value))
}

// Rewrite sections contained with `tabs` zone markers as <Tab> components
module.exports = () => (tree, file) => {
  zone(tree, 'tabs', (start, nodes, end) => {
    let tabGroup = u('tabGroup', nodes)

    let slugger = new Slugger()

    // Group sections into `tab` nodes using headings as labels
    while (tabGroup.children.find(node => is(node, 'heading'))) {
      heading(tabGroup, () => true, (start, nodes, end) => {
        let label = stringify(start)
        let value = slugger.slug(label)
        return [
          u('tab', {label, value}, nodes),
          end
        ]
      })
    }

    let tabs = tabGroup.children.filter(node => is(node, 'tab'))

    injectImport(tree, "import Tabs from '@theme/Tabs';")
    injectImport(tree, "import TabItem from '@theme/TabItem';")

    return [
      u('jsx', `<Tabs defaultValue="${tabs[0].value}" values={[${tabs.map(({label, value}) => `{label: '${label}', value: '${value}'}`).join(',')}]}>`),
      ...tabs.flatMap(({value, children}) => ([
        u('jsx', `<TabItem value="${value}">`),
        ...children,
        u('jsx', `</TabItem>`)
      ])),
      u('jsx', `</Tabs>`)
    ]
  })
}
