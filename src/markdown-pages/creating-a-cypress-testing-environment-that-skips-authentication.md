---
path: "/blog/2020/creating-a-cypress-testing-environment-that-skips-authentication"
date: "2020-02-25"
title: "Creating A Cypress Test Environment To Skip Authentication"
---

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--GFNDCpp1--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/rotbsbnt350idbzu76ah.jpg" class="image" />

## The Requirement
I recently was tasked with finding a way to skip authentication to easily test our apps using the great End to End testing tool [Cypress](https://www.cypress.io/). Cypress does provide simple solutions for testing your app's authentication and authorization but in our scenario, we just wanted to skip it altogether. 


## Some Context
In our case, we wanted to use an in-house npm package that handles the authentication logic. All we need to do is just import that module into our `app.module` with an environment-specific identity configuration.

**With Authentication**
<pre><code>
  @NgModule({
    imports: [InHouseIdentityModule.forRoot(environment.identityConfig)]
  })
  export class AppModule {}
</code></pre>


**Without Authentication**
<pre><code>
  @NgModule({
    imports: [InHouseIdentityModule.forRoot(null)]
  })
  export class AppModule {}
</code></pre>

As you can see above, if *null* is passed into the `InHouseIdentityModule.forRoot()` method, it will skip authentication for our app.

### Creating e2e Environment
The first thing we need to do is create a new environment. We will create an `environment.e2e.ts` to go inside the `/environments` directory with the rest of our environment configurations. We should then copy any app-specific configurations needed in addition to adding *identityConfig* equal to null. It should look something like this...

<pre><code>
  export const environment: IEnvironment = {
    // your other app configurations
    identityConfig: null
  };
</code></pre>

This will make sure that when the e2e configuration is used that null is passed into the identityModule and therefore skipping authentication. 

The next thing we need to do is configure *angular.json* to build our e2e configuration. 

<pre><code>
  {
    "projects": {
      "appName": {
        "architect": {
          "build": {
            "configuration": {
              "e2e": {
                "fileReplacements": [
                  {
                    "replace": "src/environments/environment.ts",
                    "with": "src/environments/environment.e2e.ts"
                  }
                ]
              }
            }
          },
          "serve": {
            "configurations": {
              "e2e" {
                "browserTarget": "auto:build:e2e"
              }
            }
          }
        }
      }
    }
  }
</code></pre>

Here we are telling angular to replace `environment.ts` with `environment.e2e.ts` when using the build configuration *e2e*. We then tell angular that when we serve the app with the *e2e* configuration, it will target the e2e build. 

Finally, let's create a script in our `package.json` to easily build and serve our app using the new e2e configuration. 

<pre><code>
  {
    "scripts": {
      "start:e2e": "ng serve --configuration=\"e2e\"",
      "build:e2e": "ng build --configuration=\"e2e\""
    }
  }
</code></pre>

Now if we run our app by using `npm run start:e2e` the app will serve and it will skip authentication!

**BONUS**
If you need to be able to run cypress headlessly in your CI pipeline, you can add the following script to your `package.json`:

`"cypress:ci": "start-server-and-test start:e2e http-get://localhost:4200 cypress:run",`


