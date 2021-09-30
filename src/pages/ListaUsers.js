import React, { useState, useEffect } from 'react';
import styles from './ListaUsers.module.css';
import { FcEditImage, FcDeleteDatabase, FcHome, FcAbout, FcAlphabeticalSortingAz } from 'react-icons/fc'
import EliminaSuccess from '../components/EliminaSuccess';
import { Link } from 'react-router-dom';
import AggiornaUsers from './AggiornaUsers';
import NavbarIconLista from '../components/NavbarIconLista';

const ListaUsers = () => {
    // State per far vedere l'elenco delle madri nella lista grazie allo state useEffect
    const [madri, setMadri] = useState([]);

    // Questo state serve per andare nella pagina aggiornaUsers
    const [risUpdate, setRisUpdate] = useState(false)

    // In questo state, settato con un oggetto vuoto, passeremo il contatto intero alla pagina 'aggiorna' per aggiornare il campo
    const [contattoMadre, setContattoMadre] = useState({})

    // State per non far vedere ripetizioni di madri che hanno lo stesso id e più figli
    const  [madriUniche, setMadriUniche] = useState([])

    // Questo state mi serve per fare il passaggio condizionale una volta che è stato cancellato il record
    const [risCanc, setRisCanc] = useState(false)

    // State che permette di caricare una volta la lista appena viene caricata la pagina e otteniamo così l'elenco completo
    useEffect(() => {
        const getElenco = async() => {
            const res = await fetch("http://localhost:3032/listaMadri");
            const data = await res.json();
            setMadri(data);
            setMadriUniche([...new Map(data.map(item => [item["idMadre"], item])).values()])
        }
        getElenco();
    }, [])



    // Tramite codice similare a quello della Rubrica => FUNZIONA
    // const eliminaMadre = async (nome, cognome, id) => {
    //     if(window.confirm(`Vuoi davvero eliminare il contatto: ${nome} ${cognome}?`)) {
    //         const res = await fetch("http://localhost:3032/eliminaMadre", {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-type": "application/json"
    //             },
    //             body: JSON.stringify({ id })
    //         });

    //         const { status } = await res.json();
    //         setRisCanc(status)
    //     }
    // }

    // Con codice similare a quello della todolist => FUNZIONA
    const eliminaMadre = async(nome, cognome, id) => {
        if(window.confirm(`Vuoi cancellare il contatto ${nome} ${cognome} ?`)) {
            const res = await fetch(`http://localhost:3032/eliminaMadre/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ id })
            })
            await res.json()
            setRisCanc(true)
        }
    }

    if(risCanc) return  <EliminaSuccess/>
        
    if(risUpdate) return <AggiornaUsers  contattoMadre={contattoMadre} madri={madri}/>
        
    if(madri)

    return (

        <div className={styles.container}>
            <div className={styles.contentTitle}>
                <div className={styles.contentIcons}>
                    <NavbarIconLista />
                </div>
                
                <h1>Lista completa delle madri</h1>    
            </div>
            
            <table className={styles.tabllaContainer}>
                <thead>
                    <tr>
                    <th id={styles.thId}>ID</th> 
                    <th>Nome</th>
                    <th>Cognome</th>
                    <th id={styles.thAction}>Action</th>
                </tr>
                </thead>
                
                {madriUniche.map((e, index) => {
                    return(
                        <tbody>
                            <tr key={index} onClick={() => {setRisUpdate(true); setContattoMadre(e)}} className={styles.trClick}>
                            <td id={styles.tdId}>{index + 1}</td>
                            <td  id={styles.tdNome}>{e.nome}</td>
                            <td id={styles.tdCognome}>{e.cognome}</td>
                            <td>
                                <div className={styles.iconAction}>
                                    <button className={styles.btnEdit} onClick={() => {setRisUpdate(true); setContattoMadre(e)}}>
                                        <FcEditImage className={styles.edit} className={styles.edit}/>
                                        <p>EDIT</p>
                                    </button>
                                    
                                    <button onClick={() => eliminaMadre(e.nome, e.cognome, e.idMadre)} className={styles.btnDelete}>
                                        <FcDeleteDatabase className={styles.edit} />
                                        <p>ELIMINA</p>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        
                    )
                })}
            </table>
        </div>
    )
}

export default ListaUsers
