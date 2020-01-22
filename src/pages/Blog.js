import React from 'react';

import Layout from '../components/Layout';
import BlogHeader from '../components/BlogHeader';
import BlogPreview from '../components/BlogPreview';

const Blog = () => (
  <Layout fullMenu>
    <article id="main">
      <BlogHeader />
      
      <section className="wrapper style5">
        <div className="inner">
          <BlogPreview
            title="Code Mash 2020"
            date="January 20, 2020"
            preview="I just got back from yet another year attending CodeMash. This year, 
            like every year was an amazing experience. I was able to reconnect with
            so many old friends and even make some new ones. CodeMash in my opinion 
            is one of the top regional tech conferences. You know you will get 
            a lot of bang for your buck every time you attend CodeMash. At just $300,
            it is affordable for anyone who wants to come to the 2 day all inclusive
            conference."
            url="/blog/2020/01/CodeMash"
          />

          <BlogPreview
            title="Live Coding: Learning Gatsby Part 1"
            date="January 18, 2020"
            preview=""
            url="/blog/2020/01/LiveCoding01"
          />

          <BlogPreview
            title="I Submitted My First Talk!"
            date="January 16, 2020"
            preview="I did a scary thing! Like something to be honest was something I would never do.
            I submitted my very first CFP (and now several since). For me, this was both something
            that terrified me as well as a goal for 2020. I never thought I would get to a point where
            I felt smart enough to give a talk at a conference. I decided to not let imposter syndrome
            rule my life anymore and be confident in the knowledge I've gained through being an everyday 
            programmer."
            url="/blog/2020/01/CFP"
          />

          <BlogPreview
            title="Honduras - Fiesta De Los Sueños"
            date="November, 03, 2019"
            preview="I just got back from my 5th trip to Honduras over the past few years.
            Every trip I am reminded that it is such a beautiful country. Though 
            America has it's challenges (and we certainly are not perfect) it does
            not even compare to other countries on so many ways. You see countries
            like Honduras don't have the time to complain about the things we in America
            often find ourself doing, because they are too busy trying to do things like
            feeding their families."
            url="/blog/2019/11/Honduras"
          />
        </div>
      </section>
    </article>
  </Layout>
);

export default Blog;
