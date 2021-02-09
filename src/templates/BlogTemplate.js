import React from 'react';
import { graphql, Link } from 'gatsby';
import BlogHeader from '../components/BlogHeader';
import Video from '../components/Video';

export default function BlogTemplate({
    data
}) {
    const { markdownRemark } = data
    const { frontmatter, html } = markdownRemark
    return (
        <article id="main">
            <BlogHeader />
            <section className="wrapper style5">
                <div className="inner">
                  <h2>{frontmatter.title}</h2>
                  <p><em>{frontmatter.date}</em></p>

                  <Video videoSrcUrl={frontmatter.videoUrl} />
                  <div
                      className="blog-post-content"
                      dangerouslySetInnerHTML={{ __html: html }}
                  />
                  <Link to="/blog" className="button small icon solid fa-chevron-left" >Back To Blog</Link>
                </div>
            </section>
        </article>
    )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        videoUrl
      }
    }
  }
`