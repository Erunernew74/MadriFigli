import React from 'react';
import styles from './FormInput.module.css';

const FormInput = ( { e, i, handleFigli }) => {
    // form che serve per inserire i figli in maniera dinamica 

    return (
        <div className={styles.container}>
            <input type="text" name="nomeFiglio" value={e.nomeFiglio} onChange={(e) => handleFigli(e, i)} placeholder='Nome figlio/a....' className={styles.inputNomeFiglio}/>
            <input type="text" name="anniFiglio" value={e.anniFiglio} onChange={(e) => handleFigli(e, i)}placeholder='Anni figlio/a....' className={styles.inputAnni}/><br/>
        </div>
    )
}

export default FormInput
