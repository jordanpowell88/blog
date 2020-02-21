---
path: "/blog/2020/upgrading-to-angular-9-di-error"
date: "2020-02-21"
title: "Upgrading to Angular 9 DI Error"
---

### Some Context
Days after the release of Angular 9, I quickly and easily upgraded an enterprise application I've been working on for the better part of a year. Using the Angular CLI this was made super simple and painless using `ng-upgrade`. After the upgrade schematic ran I quickly ran an `ng serve` and wah-la! My app worked great and is running on IVY!.

Everything was great until about 2 weeks later another dev on my team pushed an update to a private npm package my app was consuming. That package was an angular library running in version 7. The library built just fine and passed all our CI checks and published it to npm successfully. Once I upgraded my enterprise app to pull in that minor update of that npm package my app completely blew up at run-time. My app built just fine but my view had nothing but a white screen and a very non-descript console error. 

After a few hours of debugging, I figured I would share my findings in case anyone else runs into this issue in the future. 

### The Error 
`Error: Can't resolve all parameters for ConfiguredLogger`

I reviewed my library module to verify I was providing the correct dependencies and reviewed the ConfiguredLogger itself. All looked good to me, so I thought maybe the library didn't bundle correctly before deploying. I reviewed the bundled files which looked good as well. After looking deeper into the stack trace I found the culprit!

<code>// InjectionTokens should have an injectable def (ɵprov) and thus should be handled above.
    // If it's missing that, it's an error.
    if (token instanceof InjectionToken) {
       throw new Error(Token ${stringify(token)} is missing a ɵprov definition.);
    }
</code>
I noticed the comment on like 16,829 of my angular core.js file! I then reviewed my ConfiguredLogger and found the culprit

<code>
export class ConfiguredLogger{
  constructor(
    @Inject(LOGGER_CONFIG) loggerConfig: LoggerConfig) {}
}
</code>

My Class was using an `@Inject()` decorator in the constructor but I didn't have an `@Injectable()` decorator on the class itself. (This must be one of the reasons why people dislike decorators!)


### Final Thoughts
Ultimately it was a very simple fix but something very easy to miss with the previous versions of Angular. It turns out this was most likely issue for a while but wasn't raised until upgrading to version 9. Ultimately I hope this quick write up will save you the time I lost!