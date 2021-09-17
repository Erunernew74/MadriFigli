import React from 'react';
import styles from './InserimentoSuccess.module.css';
import NavbarIcon from './NavbarIcon';

const InserimentoSuccess = () => {
    return (
        <div className={styles.container}>
            <NavbarIcon />
            <h1 className={styles.title}>Inserimento avvenuto con successo</h1>
        </div>
    )
}

export default InserimentoSuccess
