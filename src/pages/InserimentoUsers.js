import React, { useState, useRef } from 'react';
import styles from './InserimentoUsers.module.css';
import InserimentoSuccess from '../components/InserimentoSuccess';
import FormInput from '../components/FormInput';
import NavbarIcon from '../components/NavbarIcon';

const InserimentoUsers = () => {

    // Settaggio dell'input dinamico relativo al nome del figlio che sarà settato ad input-0 come valore iniziale
    const [inputs, setInputs] = useState(["input-0"])

    // Settaggio dell'input dinamico relativo agli anni del figlio che sarà settato ad input-0 come valore iniziale
    const [inputsAnniFiglio, setInputsAnniFiglio] = useState(["anniFiglio-0"]);

    // useRef che ci serve pre prendere il value degli input
    const nome = useRef('');
    const cognome = useRef('');
    const cittaResidenza = useRef('');
    const provinciaResidenza = useRef('');
    const indirizzo = useRef('');
    const cittaNascita = useRef('');
    const annoNascita = useRef('');
    const codiceFiscale = useRef('');

    // questo state ci serve per eseguire il render condizionato
    const [data, setData] = useState(null)

    // Inserimento madre e inserimento dinamico del/dei figlio/figli
    const inserimentoUser = async(e) => {
        e.preventDefault();

        // Inserisce nel db il campo dei nomi dei figli della tabella Figli
        const figli = inputs.map((e) => {
            return document.querySelector(`#${e}`).value
        })
        
        // Inserisce nel db il campo degli anni dei figli della tabella Figli
        const anniFigli = inputsAnniFiglio.map((e) => {
            return document.querySelector(`#${e}`).value
        })

        const res = await fetch('http://localhost:3032/inserisciUser', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                nome: nome.current.value,
                cognome: cognome.current.value,
                cittaResidenza: cittaResidenza.current.value,
                provinciaResidenza: provinciaResidenza.current.value,
                indirizzo: indirizzo.current.value,
                cittaNascita: cittaNascita.current.value,
                annoNascita: annoNascita.current.value,
                codiceFiscale: codiceFiscale.current.value,
                figlio: figli,
                anniFiglio: anniFigli,
            }),
        })
        setData(await res.json())
    }


    const aggiungiFiglio = () => {
        // Aggiungo dinamicamente il campo del nome del figlio cliccando sul bottone
        let newInput = `input-${inputs.length}`;
        setInputs([...inputs, newInput]);

        // Aggiungo dinamicamente il campo degli anni del figlio cliccando sul bottone
        newInput = `anniFiglio-${inputs.length}`;
        setInputsAnniFiglio([...inputsAnniFiglio, newInput])

    }

    if(data) {
        return <InserimentoSuccess />
    }

    return (
        <div>
            <div className={styles.navbarIconContainer}>
                <NavbarIcon />
            </div>
            
            <h1 className={styles.title}>Inserimento madri e figli</h1>
            <div className={styles.formItems}>
                <div className={styles.containerInputs}>
                    <h3>Anagrafica madre</h3>
                    <input type='text' ref={nome} placeholder='Nome...' id={styles.idNome} />
                    <input type='text' ref={cognome} placeholder='Cognome...' id={styles.idCognome} />
                    <input type='text' ref={cittaResidenza} placeholder='Città di residenza...' id={styles.idCittaResidenza} />
                    <input type='text' ref={provinciaResidenza} placeholder='Provincia di residenza...' id={styles.idProvinciaResidenza} />
                    <input type='text' ref={indirizzo} placeholder='Indirizzo...' id={styles.idIndirizzo} />
                    <input type='text' ref={cittaNascita} placeholder='Città di nascita...' id={styles.idCittaNascita} />
                    <input type='text' ref={annoNascita} placeholder='Anno di nascita...' id={styles.idAnnoNascita} />
                    <input type='text' ref={codiceFiscale} placeholder='Codica fiscale...' id={styles.idCodiceFiscale} />
                    <div className={styles.btnContainer}>
                        <button className={styles.btnInserisciUser} onClick={(e) => inserimentoUser(e)}>INSERISCI USERS</button>
                    </div>
                </div>
                <div className={styles.containerFigli}>
                    <div className={styles.inputFiglio}>
                        <button className={styles.btnAggiungiFiglio} onClick={(e) => aggiungiFiglio(e)}>{" "} AGGIUNGI FIGLIO</button>
                    </div>
                    <div className={styles.inputFigli}>
                        {inputs.map((input) => {
                           return <FormInput key={input} id={input} className={styles.formInput} />
                        })}
                    </div>
                </div>
                
                
            </div>
            
        </div>
    )
}

export default InserimentoUsers
