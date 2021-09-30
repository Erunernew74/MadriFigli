import React from 'react';
import { useState, useEffect } from 'react';
import UpdateSuccess from '../components/UpdateSuccess';
import styles from './AggiornaUsers.module.css';
import NavbarIcon from '../components/NavbarIcon';
import FormInputsDelete from '../components/FormInputsDelete';
import { FcUnlock } from 'react-icons/fc';
import { GrUpdate } from 'react-icons/gr'



const AggiornaUsers = ({  contattoMadre, madri }) => {
    // Con questo state riproduciamo i valori presenti negli input riferiti alle madri
    const [input, setInput] = useState({
        nome: contattoMadre.nome,
        cognome: contattoMadre.cognome,
        cittaResidenza: contattoMadre.cittaResidenza,
        provinciaResidenza: contattoMadre.provinciaResidenza,
        indirizzo: contattoMadre.indirizzo,
        cittaNascita: contattoMadre.cittaNascita,
        annoNascita: contattoMadre.annoNascita,
        codiceFiscale: contattoMadre.codiceFiscale
    });

    // Questo state mi ritorna i figli che ha una madre
    const [inputsFigli, setInputsFigli] = useState([]);

    // Questo state ci serve per il passaggio condizionale alla pagina di avvenuto aggiornamento
    const [goToToUpdate, setGoToUpdate] = useState(false);

    const [disabled, setDisabled] = useState(true)


    useEffect(() => {
        const figliMadre = madri.filter((e) => e.idMadre == contattoMadre.idMadre)
        figliMadre.forEach((e) => {
            let newInput = {
                nomeFiglio: e.nomeFiglio,
                anniFiglio: e.anniFiglio,
                id: e.id 
            }
            setInputsFigli((prevInputs) => ([...prevInputs, newInput]))
        })
    }, [])


    const handleMadri = (e) => {
        const { name, value } = e.target;
        setInput({...input, [name]: value})
    }

    const handleFigli = (e, i) => {
        const { name, value } = e.target;
        const newInputsFigli = [...inputsFigli];
        newInputsFigli[i][name] = value;
        setInputsFigli(newInputsFigli);
    }


    const aggiungiFiglio = () => {
        setInputsFigli([...inputsFigli, { nomeFiglio:"", anniFiglio:"", id: null }])
    }

    // Fetch per eliminare un figlio
    const eliminaFiglio = async (id, i) => {
        if(!id) {
            const newInputsFigli = [...inputsFigli];
            newInputsFigli.splice(i, 1)
            setInputsFigli(newInputsFigli)
        }
        else {
            if(window.confirm(`Vuoi davvero eliminare il figlio?`)) {
                const res = await fetch(`http://localhost:3032/eliminaFiglio/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ id })
                });
                const { status } = await res.json();
                const newInputsFigli = [...inputsFigli];
                newInputsFigli.splice(i, 1);
                setInputsFigli(newInputsFigli);
            }
        }
    }

    const aggiornaUser = async () => {
        if(contattoMadre.nome !== input.nome || 
            contattoMadre.cognome !== input.cognome || 
            contattoMadre.cittaResidenza !== input.cittaResidenza || 
            contattoMadre.provinciaResidenza !== input.provinciaResidenza || 
            contattoMadre.indirizzo !== input.indirizzo || 
            contattoMadre.cittaNascita !== input.cittaNascita || 
            contattoMadre.annoNascita !== input.annoNascita || 
            contattoMadre.codiceFiscale !== input.codiceFiscale) {
                const res = await fetch("http://localhost:3032/aggiornaContatto", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ nome: input.nome, 
                        cognome: input.cognome,
                        cittaResidenza: input.cittaResidenza,
                        provinciaResidenza: input.provinciaResidenza,
                        indirizzo: input.indirizzo,
                        cittaNascita: input.cittaNascita,
                        annoNascita: input.annoNascita,
                        codiceFiscale: input.codiceFiscale,
                        id: contattoMadre.idMadre
                    })
                })
                const { status } = await res.json();

        }
        inputsFigli.forEach(async (e) => {
            if(e.id == null) {
                const res = await fetch("http://localhost:3032/inserisciFiglio", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify( { nomeFiglio: e.nomeFiglio, anniFiglio: e.anniFiglio, idMadre: contattoMadre.idMadre })
                    
                })
                const { status } = await res.json()
            }else {
                const res = await fetch("http://localhost:3032/inserisciFiglio", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify( {
                        nomeFiglio: e.nomeFiglio,
                        id: e.id
                    })
                })
                const { status } = await res.json(); 
            }
        })
        setGoToUpdate(true)
    }

    const toggleInput = () => {
        setDisabled(!disabled);// Facciamo !disabled così da effettuare l'effetto toggle
    }

    if(goToToUpdate)
        return <UpdateSuccess />

    return (
        <>  
            <div className={styles.containerIconTitle}>
                <NavbarIcon />
                    <div className={styles.container}>
                        <h1 className={styles.title}>Aggiornamento utente: {input.nome} {input.cognome} </h1>
                        <button className={styles.btnSblocca} onClick={toggleInput}>
                            <FcUnlock  className={styles.sblocca}/>
                            <p>SBLOCCA</p>
                        </button>
                        <button className={styles.btnSblocca} onClick={() => aggiornaUser()}>
                            <GrUpdate  className={styles.sblocca}/>
                            <p>AGGIORNA</p>
                        </button>
                        
                        
                        {/* Visualizzazione dei dati della madre */}
                        <div className={styles.containerInputs}>
                            <div className={styles.anagraficaContainer}>
                                <fieldset className={styles.fieldsetAnagrafica}>
                                <legend>Anagrafica</legend>
                                    <div>
                                        <lalbel>Nome:</lalbel>
                                        <input type='text'
                                            name="nome" 
                                            value={input.nome}
                                            onChange={handleMadri}
                                            disabled={disabled}
                                            /><br/><br/>
                                        <lalbel>Cognome:</lalbel>
                                        <input type='text'
                                            name="cognome" 
                                            value={input.cognome}
                                            onChange={handleMadri}
                                            disabled={disabled}
                                            /><br/><br/>
                                        <lalbel>Città di residenza:</lalbel>
                                        <input type='text'
                                            name="cittaResidenza"
                                            value={input.cittaResidenza} 
                                            onChange={handleMadri}
                                            disabled={disabled}
                                            /><br/><br/>
                                        <lalbel>Indirizzo:</lalbel>
                                        <input type='text'
                                            name="indirizzo" 
                                            value={input.indirizzo} 
                                            onChange={handleMadri}
                                            disabled={disabled}
                                            /><br/><br/>
                                    </div>
                                    <div>
                                        <lalbel>Provincia di residenza:</lalbel>
                                        <input type='text'
                                            name="provinciaResidenza" 
                                            value={input.provinciaResidenza}
                                            onChange={handleMadri}
                                            disabled={disabled} 
                                            /><br/><br/>
                                        <lalbel>Città di nascita:</lalbel>
                                        <input type='text'
                                            name="cittaNascita" 
                                            value={input.cittaNascita}
                                            onChange={handleMadri}
                                            disabled={disabled} 
                                            /><br/><br/>
                                        <label>Anno di nascita:</label>
                                        <input type='text'
                                            name="annoNascita" 
                                            value={input.annoNascita}
                                            onChange={handleMadri}
                                            disabled={disabled} 
                                            /><br/><br/>
                                        <label>Codice Fiscale:</label>
                                        <input type='text'
                                            name="codiceFiscale" 
                                            value={input.codiceFiscale}
                                            onChange={handleMadri}
                                            disabled={disabled} 
                                            /><br/><br/>
                                    </div><br/>
                                </fieldset>
                            </div>
                            
                            <div className={styles.figliContainer}>
                                <fieldset className={styles.fieldsetFigli}>
                                <legend>Figli</legend>
                                    <div>
                                    {inputsFigli.map((e, i) => {
                                        return(
                                            <FormInputsDelete key={i} e={e} i={i} handleFigli={handleFigli} eliminaFiglio={eliminaFiglio} disabled={disabled} />
                                        )
                                    })}
                                    </div>
                                    <button onClick={aggiungiFiglio}>AGGIUNGI FIGLIO</button>
                                </fieldset>  
                            </div>
                              
                        </div>
                        
                        
                    <div className={styles.btnContainer}>
                        
                        
                        <button onClick={() => aggiornaUser()} className={styles.btnAggiorna}>AGGIORNA</button>
                    </div>
                        
                </div>
                    
            </div>
            
        </>
    )
}

export default AggiornaUsers
