import React from "react";
import { Link } from "react-router-dom";

export const AppLayout = ({ children }) => (
  <section className="section">
  <nav className="navbar" role="navigation" aria-label="main navigation">
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
