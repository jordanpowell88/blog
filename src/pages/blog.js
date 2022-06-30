import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import BlogHeader from '../components/BlogHeader';
import BlogPreview from '../components/BlogPreview';

const Blog = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge =>
        <BlogPreview
            key={edge.node.id}
            title={edge.node.frontmatter.title}
            date={edge.node.frontmatter.date}
            preview={edge.node.excerpt}
            url={edge.node.frontmatter.path}
        />
    )
  return (
    <Layout fullMenu>
      <article id="main">
        <BlogHeader />
        <section className="wrapper style5">
          <div className="inner">
            {Posts}
          </div>
        </section>
      </article>
    </Layout>
  )
}

export default Blog;
export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { path: { regex: "?:/blog/" }}}
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`