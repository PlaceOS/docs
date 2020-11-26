# PlaceOS Docs

This repository contains the human-created technical docs, guides and reference material for PlaceOS.

## Editing

All content is [Markdown](https://www.markdownguide.org/).

To aid in version control and encourage clear, concise communication use [semantic line breaks](https://sembr.org/).
This, along with analysis of language complexity and style will be automatically checked.

When working locally, using an [editor integration](https://textlint.github.io/docs/integrations.html) is _highly_ recommended.
Run:
```bash
npm install place-labs/orthograph-err
```
To install the rules, dictionaries and associated tooling this uses.

These checks should be an aid, not a hindrance.
Use [`.textlintrc`](./.textlintrc) to adjust as required.

Corrections, additions or any changes should take place in their own branch (or fork).
When you are happy with your changes, submit a PR for automated proofreading and feedback from a human.

## Deployments

Updates to `master` will automatically trigger a build and deploy :robot:.
