import React from 'react';
import { Link } from 'gatsby';

const BlogHeader = () => (
    <header>
      <Link to="/blog"><h2>My Blog</h2></Link>
      <p>Those Who Dream The Most...Do The Most</p>
    </header>
);
  
export default BlogHeader;