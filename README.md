# PlaceOS Docs

This repository contains technical docs, guides and reference material for PlaceOS.


## Structure

Documentation groups into one of 4 top-level types.
Each of these provide information for different contexts.

```text
                               ▲
                               │
                           practical
                               │
                               │
            tutorials          │            how-to
      (learning-orientated)    │     (problem-orientated)
                               │
                               │
◄─study────────────────────────┼──────────────────────────work─►
                               │
                               │
             explain           │           reference
   (understanding-orientated)  │   (information-orientated)
                               │
                               │
                          theoretical
                               │
                               ▼
```

For information on how to structure each of these, see the README's located in each directory.


## Format and Language Style

All content is [Markdown](https://www.markdownguide.org/).

To aid in version control and encourage clear, concise communication use [semantic line breaks](https://sembr.org/).
This, along with analysis of language complexity and style will be automatically checked.

### Extended Syntax

#### Tables

Use the widely supported [markdown table syntax](https://www.markdownguide.org/extended-syntax/#tables).

#### Code Blocks

When providing inline code examples, use [fenced code blocks](https://www.markdownguide.org/extended-syntax/#fenced-code-blocks).

These should specify the language to use for syntax highlighting:
~~~markdown
```crystal
puts "hello world!"
```
~~~

When referring to an except from a specific source, a `title` key can refer to this.
~~~markdown
```crystal title="src/universe.cr"
def answer
  42
end
```
~~~

Use braces to specify a line to highlight within the block.
~~~markdown
```crystal {3}
require "./universe"

puts answer  # this line will highlight
```
~~~
Sets of lines are also supported, as are ranges and any combination of these - `{1,4-7,20}`.


#### Admonitions

Define content that should appear in a call-out by wrapping with three colons:
```markdown
:::note
The content and title *can* include markdown.
:::

:::tip You can specify an optional title
Heads up! Here's a pro-tip.
:::

:::info
Useful information.
:::

:::caution
Warning! You better pay attention!
:::

:::danger
Danger danger, mayday!
:::
```

#### Tabs

When communicating different variations of the same information, use tabs.
An example of would be code sample in different languages.

Use a pair of `tabs` zone markers to define a tab group.
Content between these will segment based on headings, and each section becoming a tab.

~~~markdown
<!--tabs start-->
# Foo
This will show under a 'Foo' tab.

# Bar
And this under 'Bar'.
<!--tabs end-->
~~~

Heading levels should fit within the surrounding context to preserve document structure.

#### Heading IDs

All headings will render with link-able anchors.
By default, this is a `kebab-case` of the heading text.
Specify a custom ID within braces to override this.

```markdown
### My Great Heading {#custom-id}
```

#### Abbreviations

When a document introduces abbreviations, use footnotes to define these.
```markdown
Here is an example where we refer to MDAST, a Markdown AST.

*[MDAST]: Markdown Abstract Syntax Tree.
*[AST]: Abstract syntax tree
```
Any usage of the abbreviation will rewrite with an enclosing semantic element.

<!--
#### Diagrams
TODO: define and explain syntax for inline Mermaid diagrams.
-->

### Front Matter

The head of a document can specify an optional set of metadata enclosed in `---` lines.

#### `id`
A unique document ID.
If this field is not present, the document's ID will default to its filename (without the extension).

#### `title`
The title of the document.
If this field is not present, the document's title will default to its `id`.

#### `hide_title`
Whether to hide the title at the top of the document.
`false` by default.

#### `hide_table_of_contents`
Whether to hide the table of contents to the right.

#### `sidebar_label`
The text shown in the document sidebar and in the next/previous button for this document.
If this field is not present, this will default to its title.

#### `sidebar_position`
Relative priority against other documents within the same directory for ordering in navigation.

#### `keywords`
Keywords meta tag for the document page, for search engines.

#### `description`
The description used by search engines.
If this field is not present, it will default to the first line of the contents.

#### `slug`
Allows to customize the document URL.
If unspecified the document path will mirror its position within this repository's file structure.


## Workflow

### Authoring

All corrections, additions and changes should take place in their own branch.
This may be directly within this repository, or a fork for larger change-sets / working with external teams.

### Editing

Using an [editor integration](https://textlint.github.io/docs/integrations.html) is _highly_ recommended.
This will help provide immediate feedback as you write.

To install the rules, dictionaries and associated tooling that this uses, run:
```bash
npm install
```
These checks should be an aid, not a hindrance.
Use [`.textlintrc`](./.textlintrc) to adjust as required and submit amendments to this using the same flow as content updates.

### Local Preview

To see how content will appear, run `npm start`.
This will start a local instance of the docs site with live reload.

### Review

When you are happy with your changes, submit a PR.
This will trigger automated content proofreading and provide feedback as inline annotations.
A preview deployment, showing the content in context, will also built and linked.

Discussion and peer review may then take place within this PR.
Edits to address feedback will re-trigger automated review and provide new preview deployments.

### Publishing

Updates to default branch will automatically trigger a build and deploy :robot:.


## Meta

Content placed in `README.md` files is not rendered.
These are docs _for_ the docs and contain information for content authors and editors.

To provide similar notes inline, use [HTML comments](https://en.wikipedia.org/wiki/HTML_element#Comments).

