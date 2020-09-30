---
path: "/blog/2020/unit-testing-in-angular-to-testbed-or-not-to-testbed"
date: "2020-09-30"
title: "Unit Testing in Angular. To TestBed or NOT to TestBed"
---
I recently started consulting for a new client (no names please). As I began to create a new feature and write unit tests I noticed several things. First that writing tests were more difficult than necessary (I'll get into this more specifically later) and that the Test runner was running very slowly.

As I began to look deeper into the tests I noticed a difference between my unit tests and the previously written tests from other parts in the app. I discovered that I was using [TestBed](https://angular.io/api/core/testing/TestBed) to create my tests. This wasn't the case anywhere else in the app. I found this to be very interesting as I've always used TestBed in the past and performance was not an issue.

This led me to do some more research on the topic and see if any others in the Angular Community were not using TestBed. I couldn't find many articles but was able to find an episode of [The Angular Show](https://www.spreaker.com/user/ng-conf/e025-testing-series-part-1-unit-testing) podcast where [Joe Eames](https://twitter.com/josepheames) and [Shai Reznik](https://twitter.com/shai_reznik) were having a very healthy debate on why you should or shouldn't use TestBed. I won't spoil the episode for you but I will admit that for someone who works in Angular every day this was the first I had ever heard a case (and a good one at that) for not using TestBed.

Though I was still skeptical, I figured I would give it a shot on this project and see if it made a difference. I was quickly blown away by the increase in performance this approach brought me. This led me to ask the question of why...which ultimately led to this blog article.


## Performance
When you remove TestBed from your component spec files it essentially no longer tests the DOM. It now only tests the component class itself. This felt like a code smell at first but ultimately the more I thought about it, the more I realized that a true unit test should only be testing *one unit* of code. How the component's HTML template interacted with its component class really becomes an integration test, testing the integration between the two.

So let me unpack this a little bit more. When you use the Angular CLI and generate a new component `ng g c my-feature` it will render the following files:

- `my-feature.component.html`
- `my-feature.component.scss`
- `my-feature.component.ts`
- `my-feature.component.spec.ts`

When you open up the `my-feature.component.spec.ts` file we see the following:

```
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeatureComponent } from './my-feature.component';

describe('MyFeatureComponent', () => {
  let component: MyFeatureComponent;
  let fixture: ComponentFixture<MyFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

This essentially before each test will create a new instance of the MyFeatureComponent class and the DOM. This example is trivial but in an application with hundreds of components, generating the DOM for every test can become costly.

#### WITHOUT TestBed

```
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeatureComponent } from './my-feature.component';

describe('MyFeatureComponent', () => {
  let component: MyFeatureComponent;

  beforeEach(() => {
    component = new MyFeatureComponent()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

By just newing up the `MyFeatureComponent` class before each test it will just create the class instance and forgo the DOM itself.

### What about Dependencies?
Let's say our component now has 2 dependencies. One to a `UserService` and another to a `MyFeatureService`. How do we handle writing tests that need dependencies provided?

#### WITH TestBed
```
@angular/core/testing';

import { MyFeatureComponent } from './my-feature.component';
import { UserService, MyFeatureService } from 'src/app/services';

describe('MyFeatureComponent', () => {
  let component: MyFeatureComponent;
  let fixture: ComponentFixture<MyFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFeatureComponent ],
      providers: [UserService, MyFeatureService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

#### WTHOUT TestBed
```
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeatureComponent } from './my-feature.component';
import { UserService, MyFeatureService } from 'src/app/services';

describe('MyFeatureComponent', () => {
  let component: MyFeatureComponent;
  const userService = new UserService();
  const myFeatureService = new MyFeatureService();

  beforeEach(() => {
    component = new MyFeatureComponent(userService, myFeatureService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```
*** Note: The order of dependencies you add into the new Component class instance does need to be in the correct order with this approach.

### What if my dependencies have dependencies?
I know you were probably thinking the same thing when looking at the previous example as most dependencies have other dependencies. For example, a service typically has a dependency upon `HttpClient` which enables it to make network requests to an API. When this happens (which is almost always) we typically use a mock or a fake.

#### WITH TestBed
```
@angular/core/testing';

import { MyFeatureComponent } from './my-feature.component';
import { UserService, MyFeatureService } from 'src/app/services';

class FakeMyFeatureService {

}

class FakeUserService {

}

describe('MyFeatureComponent', () => {
  let component: MyFeatureComponent;
  let fixture: ComponentFixture<MyFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFeatureComponent ],
      providers: [
        { provide: UserService, useClass: FakeUserService },
        { provide: MyFeatureService, useClass: FakeMyFeatureService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

#### WITHOUT TestBed
```
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeatureComponent } from './my-feature.component';
import { UserService, MyFeatureService } from 'src/app/services';

class FakeMyFeatureService {

}

class FakeUserService {

}

describe('MyFeatureComponent', () => {
  let component: MyFeatureComponent;
  const userService = new FakeUserService();
  const myFeatureService = new FakeMyFeatureService();

  beforeEach(() => {
    component = new MyFeatureComponent(userService, myFeatureService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```
*** Note: You will want to use spies on those dependencies to actually test the parts of your component you care about.

## Less Flaky Tests
Without TestBed, we are no longer testing the DOM itself which means that changes to the DOM will no longer break your tests. I mean how many times have you created a component somewhere in your Angular application all of a sudden tests start failing? This is because TestBed is creating the DOM `beforeEach` test. When a component and its dependencies are added its parent component will now fail. 

Let's take a look at this more in-depth by creating a parent component called `MyParentComponent` with `ng g c my-parent`

Now let's take a look at the `my-parent.component.spec.ts` file:

### WITH TestBed
```
@angular/core/testing';

import { MyParentComponent } from './my-parent.component';

describe('MyParentComponent', () => {
  let component: MyParentComponent;
  let fixture: ComponentFixture<MyParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

#### WITHOUT TestBed
```
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyParentComponent } from './my-parent.component';

describe('MyParentComponent', () => {
  let component: MyParentComponent;

  beforeEach(() => {
    component = new MyParentComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

Now let's add `MyFeatureComponent` to the template as a child of `MyParentComponent`.

```
<my-parent>
  <my-feature />
</my-parent>
```

In this example, `my-parent.component.spec.ts` tests are now all failing as it doesn't have a declaration for `MyFeatureComponent` or it's providers `UserService` and `MyFeatureService`. Below is now what we need to do to get those tests back up and passing.

#### WITH TestBed
```
@angular/core/testing';

import { MyParentComponent } from './my-parent.component';
import { MyFeatureComponent } from './my-feature/my-feature.component';
import { UserService, MyFeatureService } from 'src/app/services';

class FakeMyFeatureService {

}

class FakeUserService {

}

describe('MyParentComponent', () => {
  let component: MyParentComponent;
  let fixture: ComponentFixture<MyParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyParentComponent, MyFeatureComponent ],
      providers: [
        { provide: UserService, useClass: FakeUserService },
        { provide: MyFeatureService, useClass: FakeMyFeatureService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

#### WITHOUT TestBed
![Thank You](https://media.giphy.com/media/IcGkqdUmYLFGE/giphy.gif)
<br />
**This requires no changes as changes to the template had no effect on the test suite!**

## Other Things To Consider
There are some tradeoffs we need to consider by not testing any part of the DOM. The biggest being that we are no longer testing the DOM or the integration between it and it's component class. In most cases, we don't particularly care that when a button is clicked we test that it calls a method on its component class. We tend to trust Angular's (click) event binding to just work. Therefore we mostly care that the method it calls actually works as expected. *HOWEVER*, because we are no longer testing this integration we no longer have the assurance that another developer on the team accidentally deletes that integration. Or that after refactoring that this particular button calls this specific method.

I do believe this can be a relatively small tradeoff and that this sort of test can be handled more appropriately using e2e tests. I would also mention that this is not an all or nothing approach to testing. In the instances in your application where you do want to test the integration between the template and its class, you can still use TestBed. You essentially just no longer get the benefits above for the parts that are now using TestBed.

*Note:* In this example the Angular app was running on Angular version 7. Angular 9 and later now render your applications using IVY which released with some performance improvements for TestBed.

## Conclusion
As you can see from our trivial example, that by removing TestBed from our Angular components spec files we are able to improve the performance of our test runner and are able to remove some of the flakiness. Of course, the magnitude by which your test speed will improve will depend upon the size of your application and the way your application is built. Applications with very large components (which is a bigger code smell) will benefit the most from this approach. Ultimately the biggest benefit to writing tests without TestBed is that you are truly writing unit tests that should be easy to write, more reliable, and provide very quick feedback. The easier, more reliable, and quicker feedback you can get from writing tests the more you can leverage the benefits of unit tests.