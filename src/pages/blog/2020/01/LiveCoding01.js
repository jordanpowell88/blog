import React from 'react';

import Layout from '../../../../components/Layout';

import BlogHeader from '../../../../components/BlogHeader';
import Video from '../../../../components/Video';

const BlogArticle = () => (
  <Layout fullMenu>
    <article id="main">
      <BlogHeader />
      <section className="wrapper style5">
        <div className="inner">
            <h2>Live Coding: Learning Gatsby Part 1</h2>
            <p><em>January 18, 2020</em></p>

            <Video videoSrcUrl="https://www.youtube.com/embed/OPts27QRfsc" />
        </div>
      </section>
    </article>
  </Layout>
);

export default BlogArticle;
