import React from 'react';

import Layout from '../../../../components/Layout';

import codemash from '../../../../assets/images/blog/2020/code-mash.jpg';
import BlogHeader from '../../../../components/BlogHeader';

const BlogArticle = () => (
  <Layout fullMenu>
    <article id="main">
      <BlogHeader />
      <section className="wrapper style5">
        <div className="inner">
          <h2>Code Mash 2020</h2>
          <p><em>January 20, 2020</em></p>
          <p>
            I just got back from yet another year attending CodeMash. This year, 
            like every year was an amazing experience. I was able to reconnect with
            so many old friends and even make some new ones. CodeMash in my opinion 
            is one of the top regional tech conferences. You know you will get 
            a lot of "bang for your buck" every time you attend CodeMash. At just $300,
            it is affordable for anyone who wants to come to the 2 day all inclusive
            conference. 
          </p>

          <h5>Pro's:</h5>
          <span className="image right">
            <img src={codemash} />
          </span>
          <p>CodeMash offers several different learning tracks (I believe 5). This wasn't
            the case in it's early years but was recently changed to provide valuable
            learning for people of all experiences and titles within the dev space. So whether
            your primarily role is a dev (frontend or backend), dev-ops, testing, or even a manager
            their is both a track and talks tailed to helping you better your career. CodeMash Conference
            also does an amazing job of providing value and entertainment extending
            past the day sessions. From the exclusive pool party in the famouse Kalahari Waterpark, to 
            the family friendly games and entertainment it has something for everyone. 
          </p>

          <p>The conference organizers also do an amazing job of catering to the needs of it's attendees.
            They provide meals for all of those with dietery restraints and event provide free shuttles
            for those staying off campus.
          </p>

          <h5>Con's:</h5>
          <p>
            My biggest complain is that you are only able to stay at the Kalahari Resort if you stay
            for the 4 day's (2 days of workshops and the 2 day conference). Though they do their
            best to provide commuting from off campus as simple as possible with their shuttle tracker
            app along with free shuttle service, it still doesn't beat the convenience of staying 
            at the Kalahari itself.
          </p>

          <h4>Learning Take Away's</h4>
          <ul>
            <li><strong>Vertical Slices Are Awesome</strong> - I started using this pattern and Jimmy Bogard's talk reassured my
              thoughts on the pattern even more.
            </li>
            <li><strong>Cory FREAKING House</strong> - He ALWAYS gives a great talk</li>
            <li><strong>ViewJS</strong> - is the perfect framework for newbies</li>
            <li><strong>Gatsby</strong> - is awesome and I'm going to write SOO Many things on this platform moving forward</li>
            <li><strong>React</strong> - is still awesome and used by A LOT of teams</li>
            <li><strong>Bold Penguin</strong> - Is such an inspiring company.</li>
            <li><strong>Consulting</strong> - I can't wait to do this fulltime</li>
          </ul>
        </div>
      </section>
    </article>
  </Layout>
);

export default BlogArticle;
