import React from 'react';
import { useState, useEffect } from 'react';
import UpdateSuccess from '../components/UpdateSuccess';
import styles from './AggiornaUsers.module.css';
import NavbarIcon from '../components/NavbarIcon';
import FormInput from '../components/FormInput';


const AggiornaUsers = ({  contattoMadre, madri }) => {
    
    const [nome, setNome] = useState(contattoMadre.nome);
    const [cognome, setCognome] = useState(contattoMadre.cognome);
    const [indirizzo, setIndirizzo] = useState(contattoMadre.indirizzo);
    const [cittaResidenza, setCittaResidenza] = useState(contattoMadre.cittaResidenza);
    const [provinciaResidenza, setprovinciaResidenza] = useState(contattoMadre.provinciaResidenza)
    const [cittaNascita, setCittaNascita] = useState(contattoMadre.cittaNascita);
    const [annoNascita, setAnnoNascita] = useState(contattoMadre.annoNascita);
    const [codiceFiscale, setCodiceFiscale] = useState(contattoMadre.codiceFiscale);

    // Questo state mi ritorna i figli che ha una madre
    const [inputs, setInputs] = useState([]);
    // Questo state mi ritorna l'input relativo agli anni di ogni figlio corrisondente
    const [inputs2, setInputs2] = useState([]);

    const [inputsTipo, setInputsTipo] = useState([]);
    const [inputsTipo2, setInputsTipo2] = useState([])

    // Questo state ci serve per il passaggio condizionale alla pagina di avvenuto aggiornamento
    const [goToToUpdate, setGoToUpdate] = useState(false);


    useEffect(() => {
        const figliMadre = madri.filter((e) => e.idMadre == contattoMadre.idMadre);
        figliMadre.forEach((e) => {
            let newInput = {
                id: e.id,
                class: `input-figlio`,
                classTipo: "input-tipo",
                value: e.figlio,
                anni: e.anni
            };
            setInputs((prevInputs) => ([...prevInputs, newInput]))
        })
    }, [])

    // Codice per aggiungere dinamicamente il campo nome ed età per un nuovo figlio direttamente dal form creato
    const aggiungiCampo = () => {
        let newInput = `input-${inputs2.length}`;
        setInputs2([...inputs2,newInput]);
        newInput = `anni-${inputs.length}`;
        setInputsTipo2([...inputs2, newInput])
    }

    // Fetch per eliminare un figlio
    const eliminaFiglio = async (id) => {
        if (window.confirm(`Vuoi davvero eliminare il figlio selezionato?`)) {

            const res = await fetch(`http://localhost:3031/eliminaFiglio`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ id })
            });

            const { status } = await res.json();

            setInputs(inputs.filter(e => e.id !== id))
        }

    }



    if(goToToUpdate)
        return <UpdateSuccess />

    return (
        <>  
            <div className={styles.containerIconTitle}>
                <NavbarIcon />
                    <div className={styles.container}>
                        <h1 className={styles.title}>Aggiornamento utente:  {nome} {cognome}</h1>

                        {/* Visualizzazione dei dati della madre */}
                        <div className={styles.containerInputs}>
                            <div>
                                <lalbel>Nome:</lalbel>
                                <input type='text' value={nome}/><br/>
                                <lalbel>Cognome:</lalbel>
                                <input type='text' value={cognome}/><br/>
                                <lalbel>Città di residenza:</lalbel>
                                <input type='text' value={cittaResidenza} /><br/>
                                <lalbel>Indirizzo:</lalbel>
                                <input type='text' value={indirizzo} /><br/>
                            </div>
                            <div>
                                <lalbel>Provincia di residenza:</lalbel>
                                <input type='text' value={provinciaResidenza} /><br/>
                                <lalbel>Città di nascita:</lalbel>
                                <input type='text' value={cittaNascita} /><br/>
                                <label>Anno di nascita:</label>
                                <input type='text' value={annoNascita} /><br/>
                                <label>Codice Fiscale:</label>
                                <input type='text' value={codiceFiscale} /><br/>
                            </div><br/>
                              
                        </div>

                        {/* Visualizzazione dei figli */}
                        <h1 className={styles.titleFigli}>Figli del contatto</h1>
                        <button onClick={(e) => aggiungiCampo(e)} className={styles.btnAggiungiFiglio}>AGGIUNGI</button>
                            <div className={styles.containerFigli}>
                                {inputs.map((e, i) => {
                                    return(
                                        <div className={styles.inputsNomiFigli}>
                                            <input type='text' key={i} className={e.class} id={e.id} placeholder={e.value} />
                                            <input type='text' key={i+i} className={e.classTipo} placeholder={e.anni} />
                                            <button key={`key-${i}`} onClick={() => eliminaFiglio(e.id)}>ELIMINA</button>
                                        </div>
                                    )
                                })}
                                {/* Otteniamo dinamicamente gli input di inserimento del nome del figlio e della sua età */}
                                <div className={styles.containerInputNuoviFigli}>
                                    {inputs2.map((input) => <FormInput id={input} /> )}
                                </div>
                                
                            </div>
                            <div className={styles.btnAggiorna}>
                                <button>AGGIORNAMENTO</button>
                            </div>
                    </div>
                    
            </div>
            
        </>
    )
}

export default AggiornaUsers
