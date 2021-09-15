---
title: Deploy a Frontend Interface
description: How to deploy a frontend interface and add to PlaceOS
sidebar_position: 3
---

## CI/CD

To work with PlaceOS frontend repositories must have build artifacts committed to a standalone repository or branch.

The [user-interfaces](https://github.com/PlaceOS/user-interfaces) repository already has CI/CD pipelines setup using GitHub Actions.

The [user-interfaces](https://github.com/PlaceOS/user-interfaces) repository follows these steps for the build pipeline:

1. Commit made with changes to `libs` or an application(`apps/<project>`)
2. Pipeline in GitHub Actions starts
3. Install dependencies and build application(s)
4. Commit build artifacts to associated branch.
   For example, a development build of `workplace` will be committed to `build/workplace/dev`

## Backoffice Setup

Once a build has been created it can be added to Backoffice so that `frontends` service can pull down the interface.

1. Navigate to the repositories page

![Navigate to the repositories page](https://user-images.githubusercontent.com/20103948/102845502-ce625780-4461-11eb-98a1-c63a684b99b6.png)

2. Add a new repository

![Add a new repository](https://user-images.githubusercontent.com/20103948/102845586-fb166f00-4461-11eb-91a6-b8255f54e5a7.png)

- Name should describe the UI
- Folder name will be the path of the UI on the domain
  e.g. `workplace` would map to `https://my.domain/workplace/`
- Repository is the URL of your git repository with the UI builds
- Repository type must be `Interface` for the deployment of a UI

![Set repository to interface](https://user-images.githubusercontent.com/20103948/102845880-ab847300-4462-11eb-97f4-addf986e547b.png)

3. After creation you'll need to edit the repository to change to the desired branch

![Edit Repository](https://user-images.githubusercontent.com/20103948/102846009-0027ee00-4463-11eb-8a2f-f3fc9234f2cd.png)

![Change Branch](https://user-images.githubusercontent.com/20103948/102846021-0cac4680-4463-11eb-944a-99a8fa086a9f.png)

4.  If your application requires authenticating with PlaceOS you will also need to add and application to the authentication domain

    - Navigate to Domains

    ![Navigate to Domains](https://user-images.githubusercontent.com/20103948/102846391-f652ba80-4463-11eb-8930-4dc4c91ed3c3.png)

    - Select your application domain + Navigate to the applications tab + Press new Application

    ![Press new Application](https://user-images.githubusercontent.com/20103948/102846495-3d40b000-4464-11eb-8bb7-f06938b223eb.png)

    - The login URL should be set to the location of your `oauth-resp.html` file from `ts-client`

After that you should be able to access your application at the URL `https://my.domain/<folder>/`.

## Updating

Once the application is setup in Backoffice it should automatically pull any changes to the set branch every hour.  
If you to make a manual update there is a pull button in the about section of the repositories page.

![Updating Interface](https://user-images.githubusercontent.com/20103948/102846756-ee474a80-4464-11eb-81d5-e1d13acbc0f3.png)

:::tip
Note that if you've set the commit on the repository not to be `HEAD` the automated pull feature will be turned off and the pull button will do nothing.
:::


*[UI]: User Interface
