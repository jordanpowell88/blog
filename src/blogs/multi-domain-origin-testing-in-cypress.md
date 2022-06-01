---
path: '/blog/2022/multi-domain-origin-testing-in-cypress'
date: '2022-04-25'
title: "Multi-Domain (Origin) Testing in Cypress"
videoUrl: 'https://www.youtube.com/embed/Fohrq5GZSD8'
---

For as amazing as Cypress is for writing end-to-end tests, it has had a very long standing "issue" around visiting multiple origins in a single spec. I won't go into the details as to why this was the case in this article, but it is important to note that previously you had to rely upon other workarounds for testing scenarios that required this sort of behavior. This was most common when trying to visit a page that requires the user to be authenticated. Typically this would then redirect the user to a different domain or origin that handles authentication.

I am happy to announce that this is no longer an issue as today Cypress launched version `9.6.0` which adds support for [cy.origin](https://docs.cypress.io/api/commands/origin) 🎉🎉🎉

Let's take a deep dive into how to use `cy.origin` in the real world. Let's create a test that visits our site locally at `http://localhost:3000` and then clicks on a login button. Here is what a Cypress test would look like:

```javascript
it("throws a cross origin error", () => {
  cy.visit("http://localhost:3000");
  cy.get("#qsLoginBtn").click()
  cy.get("#1-email").type(Cypress.env("EMAIL");
  cy.get("input[type='password']")
    .type(Cypress.env("PASSWORD"));
  cy.get("button[type='submit']").click()
})
```

If you run this test in Cypress it will throw an error that looks something like this:


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eyrl2bm4kdb6wpk8cumq.png)

No worries, because this problem is finally an easy one to solve with `cy.origin`.

### Enabling Support
To enable this support you just need to add the following flag to your `cypress.json`

```json
{
  "experimentalSessionAndOrigin": true
}
```

Now that we have enabled support for the `cy.origin` API, let's take a quick look into the way it works. 

### Syntax
```javascript
cy.origin(url, callbackFn)
cy.origin(url, options, callbackFn)
```

### Arguments
As you can see the `cy.origin` function expects 2 arguments with an optional third (middle) argument passed to it. Let me breakdown these arguments more in-depth:

#### url (String)
This argument specifies the secondary origin in which the callback will be executed.

#### options (Object)
This argument (the second and optional argument passed to the origin function) is a plain JavaScript object which will be serialized and sent from the primary origin to the secondary origin. From there it will be deserialized and passed into the callback function as its first and only argument. **_The `args` object is the only mechanism via which data may be injected into the callback as the callback is not a closure and does not retain access to the JavaScript context in which it was declared._**

#### callbackFn (Function)
This argument contains the function containing Cypress commands to be executed in the secondary origin. Cypress will strigify this function and passed from the current Cypress instance to the secondary origin and evaluated. 

Now that we have some more context as to how this works, let's add `cy.origin` to our previous test we wrote:

```javascript
it("Logs in with Auth0", () => {
  cy.visit("http://localhost:3000/");
  cy.get("#qsLoginBtn").click();

  cy.origin("https://myusername.auth0.com/", () => {
    cy.get("#1-email").type(Cypress.env("EMAIL");
    cy.get("input[type='password']")
      .type(Cypress.env("PASSWORD"));
    cy.get("button[type='submit']").click()
  }

  cy.get("h1").should("contain", "React.js Sample Project");
})
```

Now if we re-run that same test we should now be getting a passing test! 

### Refactoring into Custom Commands
Now that we have `cy.origin` working in our app, it is time to think about reusability. Because having an authenticated user is a requirement for parts (or all of our app), we will need to login over and over. This is a great candidate for moving our login code into a [Custom Cypress Command](https://docs.cypress.io/api/cypress-api/custom-commands). Let's add the following code into our `support/commands.js` file.

```javascript
Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://localhost:3000/");
  cy.get("#qsLoginBtn").click();

  cy.origin(
    "https://myusername.auth0.com/",
    { args: [email, password] },
    ([email, password]) => {
      cy.get("#1-email").type(email);
      cy.get("input[type='password']").type(password);
      cy.get("button[type='submit']").click();
    }
  );

  cy.get("h1").should("contain", "React.js Sample Project");
});
```

As you can see, we are essentially just removing the code we were doing before inside of our test to the `support/commands.js` file. **_The only difference now, is that we are passing in an optional object with an args property to the `cy.origin` command_**. The arguments are an array containing an email and password property that are now being passed into our custom login command. 

Now we can easily login to our app using our new `cy.login` custom command like so:

```javascript
beforeEach(() => {
  cy.login(
    Cypress.env("EMAIL"),
    Cypress.env("PASSWORD")
  );
});
```

Now before each tests we write, we will now login using the `cy.origin` API via our custom `login` command. However, if your spec file contains more than one test, you will now notice an issue. Before every tests runs, we now have to wait for the browser to do this login work. This takes a considerable amount of time, especially the more tests you write. Thankfully we can improve this by using [cy.session](https://docs.cypress.io/api/commands/session)

### Using cy.Session
Let's make a simple update to our `cy.login` command we just created by wrapping it with `cy.session`:

```javascript
Cypress.Commands.add("login", (email, password) => {
  cy.session([email, password], () => {
    cy.visit("http://localhost:3000/");
    cy.get("#qsLoginBtn").click();

    cy.origin(
      "https://myusername.auth0.com/",
      { args: [email, password] },
      ([email, password]) => {
        cy.get("#1-email").type(email);
        cy.get("input[type='password']").type(password);
        cy.get("button[type='submit']").click();
      }
    );

    cy.get("h1").should("contain", "React.js Sample Project");
  });
});
```

By wrapping our `cy.login` command with `cy.session` this allows Cypress to cache all cookies, tokens and data from our session to be reused quickly in subsequent tests. As you can see all of our tests as passing and our tests run much faster now!

### Conclusion
Hopefully you are as excited about this new experimental release of `cy.session` as we are here at Cypress. This feature not only solves the long standing challenge we've had around supporting multi-domain tests, but also makes things like logging in a breeze! 


Also, check out the [Official Cypress Documentation](https://docs.cypress.io/api/commands/origin) for a more in-depth look into how `cy.session` works.