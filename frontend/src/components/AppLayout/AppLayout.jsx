import React from "react";
import { Link } from "react-router-dom";

export const AppLayout = ({ children }) => (
  <section className="section">
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to="/">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </Link>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <Link to="/" className="navbar-item">
          Dashboard
        </Link>
        <Link to="/videos" className="navbar-item">
          Videos
        </Link>
      </div>
    </div>

    
  </nav>
  <div className="container">{children}</div>
  </section>
);
