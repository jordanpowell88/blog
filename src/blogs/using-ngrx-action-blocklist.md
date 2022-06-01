---
path: "/blog/2020/using-ngrx-actions-blocklist"
date: "2020-06-12"
title: "Using NgRx actionsBlocklist"
videoUrl: "https://www.youtube.com/embed/g7SdhtxuJYA"
---


Often times as your NgRx applications grow the Redux DevTools actions log can get too noisy. In my particular instance, as my application grew, their became a large number of actions that fired that were not valuable for myself and the rest of my team during development. With the default maximum number of actions set to just 25 actions, the actions you really care about can quickly become lost during development and debugging. ***That is where `actionsBlocklist` comes to the rescue!***

### HOW TO DO IT
Assuming you have `@ngrx/store-devtools` already installed, just add the following config to the instrument method to your StoreDevtoolsModule in your `app.module`

```
StoreDevtoolsModule.instrument({
  name: 'Store Name',
  maxAge: 25,
  actionsBlocklist: [
    // actions go here as list of string
    userActions.Scroll.type,
    otherFeatureActions.NotImportantAction.type,
    // etc
  ]
})
```

### WHEN TO MAYBE DO IT
To provide a little more context, my application was a single page application (SPA) form that dispatched an action on mouse scroll. So every-time the user scrolled up or down the page it could easily dispatch 25 or more actions. Those actions were important as various features in my application were selecting state based upon where in the application the user scrolled to. So, it wasn't that the actions weren't important but more specifically it wasn't providing value in the Redux DevTools Actions Log.

The following actions *could* be potential candidates to be added to `actionsBlocklist`:

- Actions dispatched by scroll events
- Repetitive actions dispatched with a low debounceTime()
- When multiple actions are often dispatched together
- Actions with no or very little side effects

### WHEN YOU SHOULD NEVER DO IT
Keep in mind adding actions to your `actionsBlocklist` will in-fact *block* them from showing up in your DevTools. Which means it can become very confusing *why* an action isn't being dispatched (even though it really is). So only add actions that you are fairly certain you do not and will not want to see anymore.

The following actions are are things you *do not* want to add to `actionsBlocklist`:

- Actions with side-effects
- Actions that happen infrequently
- Actions triggered by a user action


### CONCLUSION
Ultimately, adding actions to the `actionsBlocklist` is something you shouldn't do until it becomes glaringly obvious when debugging your application with the Redux DevTools. Its something that will scream louder and louder the more your application grows. It will almost beg you to add it!

Other alternatives to consider would be to filter the actions log in the DevTools for the actions you care about *(as long as they are within your configured maximum number of actions)*.

Finally another thing to consider is to add actions to the `actionBlocklist` temporarily during debugging to really find the actions you care about (to fix your temporary problem). *Note: Don't forget to remove them before checking in your code to source control*