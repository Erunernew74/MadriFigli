import React from 'react';
import NavbarIcon from './NavbarIcon';
import styles from './UpdateSuccess.module.css'

const UpdateSuccess = () => {
    return (
        <div className={styles.container}>
            <NavbarIcon />
            <h1>Elemento aggiornato correttamente</h1>
        </div>
    )
}

export default UpdateSuccess 
