import React from 'react';
import styles from './NavbarIconCerca.module.css';
import { FcHome, FcAbout, FcAlphabeticalSortingAz, FcList, FcSearch } from 'react-icons/fc'
import { Link } from 'react-router-dom';

const NavbarIcon = () => {
    return (
        <div>
            <div className={styles.contentTitle}>
                <div className={styles.contentIcons}>
                    <Link to='/'>
                        <button className={styles.btnIcon} id={styles.btnIconHome}>
                            <FcHome className={styles.edit} className={styles.edit}/>
                            <p>HOME</p>
                        </button>
                    </Link> 
                    <Link to='/about'>
                        <button className={styles.btnIcon} id={styles.btnIconAbout}>
                            <FcAbout className={styles.edit} className={styles.edit}/>
                            <p>ABOUT</p>
                        </button>
                    </Link>
                    <Link to='/inserimento'>
                        <button className={styles.btnIcon} id={styles.btnIconAbout}>
                            <FcAlphabeticalSortingAz className={styles.edit} className={styles.edit}/>
                            <p>INSERIMENTO</p>
                        </button>
                    </Link>
                    <a href='/lista'>
                        <button className={styles.btnIcon} id={styles.btnIconAbout}>
                            <FcList className={styles.edit} className={styles.edit}/>
                            <p>LISTA </p>
                        </button>
                    </a>
                    <a href='/cercaUser'>
                        <button className={styles.btnIcon} id={styles.btnIconAbout}>
                            <FcSearch className={styles.edit} className={styles.edit}/>
                            <p>CERCA</p>
                        </button>
                    </a>
                </div>   
            </div>
        </div>
    )
}

export default NavbarIcon
