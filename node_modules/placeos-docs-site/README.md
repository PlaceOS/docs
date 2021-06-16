# PlaceOS Docs Site

This repository contains documentation renderer and associated tooling behind [docs.placeos.com](https://docs.placeos.com).
It builds on [Docusaurus 2](https://v2.docusaurus.io/).

The content this renders can be found within [PlaceOS/docs](https://github.com/PlaceOS/docs).


### Local Development

After cloning, install dependancies (including the latest content):
```bash
npm install
```

Then boot the dev server:
```bash
npm start
```

Changes will live-reload.


### Deployment

Deployment is automated.

Commits to default branch will trigger a new build to the primary domain.

PR's each receive their own preview URL ahead of deployment.
