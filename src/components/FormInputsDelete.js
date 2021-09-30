import React from 'react'
import styles from './FormInputsDelete.module.css'

const FormInputsDelete = ({ e, i, handleFigli, eliminaFiglio, disabled }) => {
    return (
        <div className={styles.container}>
            <input type="text" name="nomeFiglio" value={e.nomeFiglio} onChange={(e) => handleFigli(e, i)} placeholder='Nome figlio/a....' className={styles.inputNomeFiglio} disabled={disabled}/>
            <input type="text" name="anniFiglio" value={e.anniFiglio} onChange={(e) => handleFigli(e, i)}placeholder='Anni figlio/a....' className={styles.inputAnni} disabled={disabled}/><br/>
            <button onClick={() => eliminaFiglio(e.id, i)} disabled={disabled}>ELIMINA</button>
        </div>
    )
}

export default FormInputsDelete
