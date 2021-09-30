import React, { useState } from 'react';
import styles from './InserimentoUsers.module.css';
import InserimentoSuccess from '../components/InserimentoSuccess';
import FormInput from '../components/FormInput';
import NavbarIcon from '../components/NavbarIcon';

const InserimentoUsers = () => {
    // Oggetti per l'inserimento nella tabella Madri
    const [inputMadre, setInputMadre] = useState({
    nome:"", 
    cognome:"", 
    cittaResidenza:"", 
    provinciaResidenza:"", 
    indirizzo:"", 
    cittaNascita:"", 
    annoNascita:"", 
    codiceFiscale:"",})

    // Array di oggetti per l'inserimento nella tgabella figli. Array di oggetti perché è dinamico
    const [inputsFiglio, setInputsFiglio] = useState([{nomeFiglio:"", anniFiglio:""}])

    // questo state ci serve per eseguire il render condizionato
    const [data, setData] = useState(false)

    // Inserimento madre e inserimento dinamico del/dei figlio/figli
    const inserimentoUser = async(e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3032/inserisciUser', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                nome: inputMadre.nome,
                cognome: inputMadre.cognome,
                cittaResidenza: inputMadre.cittaResidenza,
                provinciaResidenza: inputMadre.provinciaResidenza,
                indirizzo: inputMadre.indirizzo,
                cittaNascita: inputMadre.cittaNascita,
                annoNascita: inputMadre.annoNascita,
                codiceFiscale: inputMadre.codiceFiscale,
                figlio: inputsFiglio // E' il nostro array di oggetti. Passeremo 'numero' al codice sql per l'inserimento dei campi relativi
            }),
        })
        setData(await res.json())
    }

    // Funzione che prende i valori inseriti dentro agli input della tabella madri
    const handleMadri = (e) => {
        const {name, value} = e.target; // Prendo il valore inserito nell'input tramite il target
        setInputMadre({...inputMadre, [name]: value}); // Setto il nuovo input passandoci dentro il valore del name
    }

    // Funzione che prende i valori inseriti dentro agli input della tabella figli - *dinamica 
    const handleFigli = (e, i) => {// Gli passo l'evento target e l'indice i
        const {name, value} = e.target;// Prendo il valore inserito nell'input tramite il target
        const newInputsFigli = [...inputsFiglio];// Non sarà più un oggetto bensì un array la copia di inputs
        newInputsFigli[i][name] = value;//  Prendo ogni volta i valori relativi all'indice di quel momento, per cui dal primo che ha indice 0 al secondo che ha indice 2 e via così
        setInputsFiglio(newInputsFigli);// setto i nuovi input della tabella numeri con newInputsNum
    }

    // Funzione per l'aggiunta in maniera dinamica dei campi per il numero cioè un elemento all'array di oggetti
    const aggiungiFiglio = () => {
        setInputsFiglio([...inputsFiglio, { nomeFiglio:"", anniFiglio:"" }])
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
                    <input type='text' 
                    placeholder='Nome...' 
                    id={styles.idNome} 
                    name="nome"
                    value={inputMadre.nome}
                    onChange={handleMadri}
                    />
                    <input type='text'  
                    placeholder='Cognome...' 
                    id={styles.idCognome} 
                    name="cognome"
                    value={inputMadre.cognome}
                    onChange={handleMadri}
                    />
                    <input type='text' 
                    placeholder='Città di residenza...' 
                    id={styles.idCittaResidenza} 
                    name="cittaResidenza"
                    value={inputMadre.cittaResidenza}
                    onChange={handleMadri}
                    />
                    <input type='text'  
                    placeholder='Provincia di residenza...' 
                    id={styles.idProvinciaResidenza}
                    name="provinciaResidenza"
                    value={inputMadre.provinciaResidenza}
                    onChange={handleMadri}
                    />
                    <input type='text' 
                    placeholder='Indirizzo...' 
                    id={styles.idIndirizzo}
                    name="indirizzo"
                    value={inputMadre.indirizzo}
                    onChange={handleMadri}
                    />
                    <input type='text'  
                    placeholder='Città di nascita...' 
                    id={styles.idCittaNascita}
                    name="cittaNascita"
                    value={inputMadre.cittaNascita}
                    onChange={handleMadri}
                    />
                    <input type='text'  
                    placeholder='Anno di nascita...' 
                    id={styles.idAnnoNascita}
                    name="annoNascita"
                    value={inputMadre.annoNascita}
                    onChange={handleMadri}
                    />
                    <input type='text'  
                    placeholder='Codica fiscale...' 
                    id={styles.idCodiceFiscale}
                    name="codiceFiscale"
                    value={inputMadre.codiceFiscale}
                    onChange={handleMadri}
                    />
                    <div className={styles.btnContainer}>
                        <button className={styles.btnInserisciUser} onClick={(e) => inserimentoUser(e)}>INSERISCI USERS</button>
                    </div>
                </div>
                <div className={styles.containerFigli}>
                    <div className={styles.inputFiglio}>
                        <button className={styles.btnAggiungiFiglio} onClick={aggiungiFiglio}>AGGIUNGI FIGLIO</button>
                    </div>
                    <div className={styles.inputFigli}>
                        {inputsFiglio.map((e, i) => {
                          return <FormInput key={i} e={e} i={i} handleFigli={handleFigli} className={styles.formInput} />
                        })}
                    </div>
                </div>
                
                
            </div>
            
        </div>
    )
}

export default InserimentoUsers
