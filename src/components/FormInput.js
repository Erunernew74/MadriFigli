import React from 'react';
import styles from './FormInput.module.css';

const FormInput = ( { id }) => {
    // form che serve per inserire i figli in maniera dinamica 

    return (
        <div className={styles.container}>
            <input type='text' id={id} placeholder='Nome figlio/a....' className={styles.inputNomeFiglio}/>
            <input type='text' id={`anniFiglio-${id.split("-")[1]}`} placeholder='Anni figlio/a....' className={styles.inputAnni}/><br/>
        </div>
    )
}

export default FormInput
