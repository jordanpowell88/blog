import React from 'react';
import { Link } from 'gatsby';
import Scroll from '../components/Scroll';

export default function Nav({ onMenuToggle = () => {} }) {
  return (
    <nav id="nav">
      <ul>
        <li className="special">
          <a
            href="#menu"
            onClick={e => {
              e.preventDefault();
              onMenuToggle();
            }}
            className="menuToggle"
          >
            <span>Menu</span>
          </a>
          <div id="menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Scroll type="id" element="about">
                  <Link to="/#">About</Link>
                </Scroll>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Scroll type="id" element="events">
                  <Link to="/#">Events</Link>
                </Scroll>
              </li>
              <li>
                <Scroll type="id" element="cta">
                  <Link to="/#">Contact</Link>
                </Scroll>
              </li>
              <li>
                <a href="https://docs.google.com/document/d/1OAwDtiVtXO5-Bel7z08_JQQSkeEOSTM9RSUwhN8bjRo/edit?usp=sharing" download>
                  Resume
                </a>
              </li>
            </ul>
            <a
              className="close"
              onClick={e => {
                e.preventDefault();
                onMenuToggle();
              }}
              href="#menu"
            >
              {''}
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}
