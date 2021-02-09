import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';

import Scroll from '../components/Scroll';

import pic1 from '../assets/images/pic01.jpg';
import pic2 from '../assets/images/pic02.jpg';
import pic3 from '../assets/images/pic03.jpg';
import config from '../../config';

const IndexPage = () => (
  <Layout>
    <section id="banner">
      <div className="inner">
        <h2>{config.heading}</h2>
        <p>{config.subHeading}</p>
        <ul className="actions special">
          <li>
            <Scroll type="id" element="about">
              <Link to="/#" activeClassName="button primary" className="button primary">
                Learn More...
              </Link>
            </Scroll>
          </li>
        </ul>
      </div>
      <Scroll type="id" element="about">
        <a href="#about" className="more">
          Learn More
        </a>
      </Scroll>
    </section>

    <section id="about" className="wrapper style1 special">
      <div className="inner">
        <header className="major">
          <h2>
            A Little More <strong>About</strong> Me
          </h2>
          <p>
          Jordan is a self taught software engineer who is passionate about writing "good code" that is easy to read, test and maintain over time. He has over a decade of freelance experience in web &amp; mobile development, marketing, design and video production. He also serves as the CEO &amp; Co-Founder for the non-profit Dream On: Global.
          </p>
          <blockquote>Those Who Dream The Most...Do The Most</blockquote>
        </header>
      </div>
    </section>

    <section id="web" className="wrapper alt style2">
      <section className="spotlight">
        <div className="image">
          <img src={pic1} alt="" />
        </div>
        <div className="content">
          <h2>
            Web Development
          </h2>
          <p>
          Websites are my specialty. I'll build you the sharp and professional website you deserve! Regardless of your budget I can deliver the perfect solution to best meet your needs. Be unique and make your business stand out from the rest!
          </p>
        </div>
      </section>
      <section className="spotlight">
        <div className="image">
          <img src={pic2} alt="" />
        </div>
        <div className="content">
          <h2>
            Mobile App Development
          </h2>
          <p>
          Did you know their have been over 100 billion app downloads worldwide between the apple app store and the google play store? Mobile apps become more essential for your businesses's success each and every day. No need to spend crazy money from a big city agency when I am right in your backyard!
          </p>
        </div>
      </section>
      <section className="spotlight">
        <div className="image">
          <img src={pic3} alt="" />
        </div>
        <div className="content">
          <h2>
           Dreamer
          </h2>
          <p>
            I'm a <strong>BIG DREAMER!</strong> In addition to co-founding a non-profit I promote live events all around the world. I also teach students in Central America how to do some of the things I do.
          </p>
        </div>
      </section>
    </section>

    <section id="three" className="wrapper style3 special">
      <div className="inner">
        <header className="major">
          <h2>Some Things I Do</h2>
          <p>
            Over the past decade I have been solving the problems of people just like you by creating cool things for the internet. Here are a few things I've learned along the way.
          </p>
        </header>
        <ul className="features">
          <li className="icon solid fa-code">
            <h3>Web Development</h3>
          </li>
          <li className="icon solid fa-mobile">
            <h3>Mobile Development</h3>
          </li>
          <li className="icon solid fa-paint-brush">
            <h3>Graphic Design</h3>
          </li>
          <li className="icon solid fa-camera">
            <h3>Videography</h3>
          </li>
          <li className="icon solid fa-bullhorn">
            <h3>Public Speaking</h3>
          </li>
          <li className="icon solid fa-users">
            <h3>Event Production</h3>
          </li>
        </ul>

        <Link to="/Blog" activeClassName="button fit primary" className="button fit primary icon solid fa-chevron-right">Visit My Blog</Link>
      </div>
    </section>

    <section id="cta" className="wrapper style4">
      <div className="inner">
        <header>
          <h2>Let's Grab A Coffee</h2>
          <p>
            Have a question or need help with your next project? Do you just want to say hi and grab a cup of coffee? Either way reach out...I promise I won't bite.
          </p>
        </header>
        <ul className="actions stacked">
          <li>
            <a href="https://calendly.com/jordanpowell88" target="_blank" className="button fit primary icon solid fa-envelope">
              Contact me
            </a>
          </li>
        </ul>
      </div>
    </section>
  </Layout>
);

export default IndexPage;
