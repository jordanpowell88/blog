import React from 'react';

import Layout from '../../../../components/Layout';

import honduras from '../../../../assets/images/blog/2019/honduras.jpg';
import BlogHeader from '../../../../components/BlogHeader';
import Video from '../../../../components/Video';

const BlogArticle = () => (
  <Layout fullMenu>
    <article id="main">
      <BlogHeader />
      <section className="wrapper style5">
        <div className="inner">
          <h2>Honduras - Fiesta De Los Sueños</h2>
          <p><em>November 03, 2019</em></p>
          <p>
            I just got back from my 5th trip to Honduras over the past few years.
            Every trip I am reminded that it is such a beautiful country. Though 
            America has it's challenges (and we certainly are not perfect) it does
            not even compare to other countries on so many ways. You see countries
            like Honduras don't have the time to complain about the things we in America
            often find ourself doing, because they are too busy trying to do things like
            feeding their families. 
          </p>

          <h4>What I Know</h4>
          <span className="image right">
            <img src={honduras} />
          </span>
          <p>
            Almost 70% of Honduras is under the age of 25. Its just full of young people!
            This is both a good thing and a bad thing. With such a young populus it is
            much easier to bring about change (which is one of the biggest reasons I do the
            work that I do in Honduras). However, with so many young people their are A LOT
            of kids everywhere. 75% of homes are single mothers who find them selves each day
            working just to bring enough food home to keep their family alive. This means
            that their teenagers, kids, toddlers and even infants are left fending for themselves.
            These are some of the things that are almost impossible for most of us in America to 
            even fatham.
          </p>

          <p>
            I also know that despite the challenges it faces, the work we are doing in Honduras
            is REALLY working! This is exciting to me. I've constantly asked myself how effective
            am I actually being in Honduras. Like am I really making a difference? This was the trip
            that I will always point to for now on. We really started to see the fruits of our labor.
          </p>

          <h4>What We Did</h4>
          <p>
            We brought 15 other people with us on this trip. Anytime you are bringing a decent size group
            with us, it makes the trip most certainly more adventerous. The 4 day trip featured some of the
            following items:
          </p>
          <ul>
            <li>A Few Airplanes</li>
            <li>2 Large Outdoor Events</li>
            <li>2 Pizza Parties</li>
            <li>A Trip To An Awesome Waterfall</li>
            <li>A Visit With A Local Coffee Farmer</li>
            <li>A LOT OF COFFEE</li>
            <li>Power Chicken</li>
            <li>A Few Hours Of Sleep Here &amp; There</li>
          </ul>

          <h4>What I Learned</h4>
          <p>Our last night we went visited a village outside of one of Honduras's largest cities San Pedro Süla. 
            This "village" seamed so tiny untill we learned that over 100,000 people lived there. We also learned
            that this was the village where the famous "Honduras Caravans" were coming from. You see Hope is
            such a powerful thing. Without it, we grow weary and ultimately depressed and event desperate. For all
            of you who are blessed like me to grow up in a healthy, happy family in the midwest of the United States
            of America, PLEASE be appreciate. So many others are WAY less fortunate than you or I.
          </p>

          <h3>Join Me In 2020!</h3>
          <a href="https://dreamon.world/honduras" className="button primary icon solid fa-chevron-right">I Want To Come</a>

          <h3>Trip Documentary</h3>
          <Video videoSrcUrl="https://www.youtube.com/embed/_HWe8m0N60Y" />

        </div>
      </section>
    </article>
  </Layout>
);

export default BlogArticle;
