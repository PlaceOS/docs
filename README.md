# PlaceOS Docs

This repository contains the human-created technical docs, guides and reference material for PlaceOS.


## Editing

Corrections, additions or any changes should take place in their own branch (or fork).
When you are happy with your changes, submit a PR for automated proofreading and feedback from a human.


## Format and Language Style

All content is [Markdown](https://www.markdownguide.org/).

To aid in version control and encourage clear, concise communication use [semantic line breaks](https://sembr.org/).
This, along with analysis of language complexity and style will be automatically checked.


## Proofreading

When authoring content, using an [editor integration](https://textlint.github.io/docs/integrations.html) is _highly_ recommended.
This will help provide feedback as you write.

To install the rules, dictionaries and associated tooling this uses, run:
```bash
npm install
```

These checks should be an aid, not a hindrance.
Use [`.textlintrc`](./.textlintrc) to adjust as required and submit amendments to this using the same flow as content updates.


## Local Preview

To see how content will appear, run `npm start`.
This will start a local instance of the docs site with live reload.


## Deployments

Updates to default branch will automatically trigger a build and deploy :robot:.
