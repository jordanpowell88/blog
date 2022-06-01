---
path: "/blog/2022/migrating-to-cypress-10"
date: "2022-06-01"
title: "Migrating to Cypress 10"
videoUrl: "https://www.youtube.com/embed/mIqKNhLlPcU"
---

### An Overview
On June 1, 2022 we released Cypress version `10.0` which includes two new major features:
- A New User Interface with a Unified Testing Experience
- Component Testing

In order to gain the benefits of these new features, it was necessary for us to change a few of the ways we were doing things in the past. This article walks you through those changes, to help make your experience upgrading to Cypress `10.0` as seamless as possible. 


### Upgrading
Upgrading is simple and it just requires you to run the following in your project:

```bash
npm install -D cypress@latest
```
or

```bash
yarn add -D cypress@latest
```

### Starting the Migration
All we need to do to kickoff our migration is running the following script:

```bash
npx cypress open
```

Once Cypress launches, you will be greeted by the following [video from Cypress Staff Engineer, Jess Sach](https://player.vimeo.com/video/668764401) about some of the new features in Cypress 10. 


#### Renaming Existing Specs

The first step renaming existing specs, will automatically rename and move your existing spec files to conform to the new 10.0 standards. This includes changing the default spec folder from `cypress/integration` to the new `cypress/e2e` folder. It also includes changing the default spec file extension from `[filename].spec[.ext]` to the new `[filename].cy[.ext]`.

![Renaming Existing Cypress Specs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w2g0cwz7f7y6v3iqnrec.png)

> The table in each of the following steps provides a helpful before and after diff of each of the changes the Migrator will make in that step.

#### Renaming the Support File
The second step, automatically renames your existing support files. In `10.0`, Cypress now serves different support files for both `E2E` and `Component Testing`. This step, essentially, renames the `E2E` support file from `cypress/support/index.js` to the new `cypress/support/e2e.js`

 
![Renaming the Cypress Support File](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fuwkr910z5jo0s1x8fdu.png)

#### Migrate to the New Cypress Config
Finally, we will migrate our existing Cypress configuration, formerly `cypress.json` to the new Cypress configuration of `cypress.config.js`. This step is a little more detailed in that it not only renames the config file, but also seeds the new config with the corresponding options from the old.


![Migrate to the new Cypress Config](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9hbpaagsdpagm0gk5w16.png)

At this point, you will see a "Welcome to Cypress" window and that `E2E` testing has been successfully configured in our project. However, you may also have noticed the option to add `Component Testing`. This is one of the exciting new features that ships with Cypress 10. Notice though that this testing type is labeled as `Not Configured`. Let's change that now. 


![Testing Type Landing Page in Cypress 10.0](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nv379y6rvf6tlb78lbwu.png)

### Getting Started with Component Testing
Before we get started, It's important to note that the `10.0` release a Cypress add support for the following component testing frameworks:

- Vue 2 & 3
- Vue CLI 2 & 3
- Nuxt
- React
- Create React App
- Next.js

> No need to worry if you don't see your applications framework listed, Cypress is working hard behind the scenes to add additional framework support, including Angular and others in the near future.

The first thing we need to do to enable Component Testing is to pick our front-end framework.


![Selecting a Front-end Framework in Cypress 10](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fmbr0h8cbgxmnwpt0kb3.png)

Once we selected the appropriate framework, we are now presented with the bundler or dev server we're using.


![Selecting a Bundler in Cypress 10](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cl1b7wxuusgzlmwv7pzy.png) 

Next Cypress takes your answers to the previous two questions and provides the correct dev dependencies that need to be installed in your project. Simply copy the install script provided by the migration guide into your terminal and run. 


![Installing Dev Dependencies in Cypress 10](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v2pud5o2bl0m37ibc9v9.png)

Once all the needed dependencies have been installed in your application, you can proceed. 


![Successfully Installed Dependencies in Cypress 10](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rxdpq8pkkcck10k5f7d9.png)

Finally, we are presented with an overview of all the files that will be added to the project. This includes an update to the following:
- Cypress Config
- Adding a `cypress/support/component.js` file
- Adding a `component-index.html` file


![Cypress 10 Component Testing Migration Overview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mufarf4qnj2m4076mjf0.png)

After reviewing all of the updated files, all we need to do is select the browser of our choice and begin testing!


![Selecting A Browser in Cypress 10](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z2djbe64pcu0pnvbq1dg.png)

### Recap
Hopefully you found this guide, the video and the Cypress migration tool helpful in migrating your project to Cypress `10.0`. For more details on how to get started with Component Testing I recommend visiting [this section in our docs](https://docs.cypress.io/guides/getting-started/component-testing).

I also recommend giving this video a watch as my coleague Robert does a dive into ["How to Write Component Test with Cypress"](https://www.youtube.com/watch?v=vJ0rDP4CG-w)