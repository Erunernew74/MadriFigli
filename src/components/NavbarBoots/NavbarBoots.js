import React from "react";
import styles from "./NavbarBoots.module.css";

import { Link } from "react-router-dom";

const NavbarBoots = () => {
  return (
    <div className={styles.container}>
      <div>
        <Link to="/" className={styles.logoContainer} >
          <h1 id={styles.logoBrand}>MADRI - FIGLI</h1>
        </Link>
      </div>
      <div className={styles.menu}>
        <ul>
          <Link to="/" className={styles.linkItem}>
            <li>Home</li>
          </Link>
          <Link to="/about" className={styles.linkItem}>
            <li>About</li>
          </Link>
          <Link to="/inserimento" className={styles.linkItem}>
            <li>Inserimento</li>
          </Link>
          <Link to="/lista" className={styles.linkItem}>
            <li>Lista completa</li>
          </Link>
          <Link to="/cercaUser" className={styles.linkItem}>
            <li>Cerca Contatto</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavbarBoots;
