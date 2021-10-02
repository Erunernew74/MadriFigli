import React from "react";
import styles from "./CercaUser.module.css";
import { useState, useEffect } from "react";
import AggiornaUsers from "./AggiornaUsers";
import NavbarIconCerca from '../components/NavbarIconCerca';

const CercaUser = () => {
  const [inputs, setInputs] = useState({
    nome: "",
    cognome: "",
    cittaResidenza: "",
    provinciaResidenza: "",
    indirizzo: "",
    cittaNascita: "",
    annoNascita: "",
    codiceFiscale: "",
    nomeFiglio: "",
    anniFiglio: "",
  });
  const [data, setData] = useState([]);
  const [contattiUnici, setContattiUnici] = useState([]);
  const [errors, setErrors] = useState([]);
  // State condizionale per passare al componente Update
  const [risUpdate, setRisUpdate] = useState(false);
  const [contatto, setContatto] = useState({});

  const [resetInput, setResetInput] = useState("")

  const handleCerca = async (e) => {
    setErrors([]);
    e.preventDefault();
    const res = await fetch("http://localhost:3032/cercaContatto", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
    
    const contatti = await res.json();
    if (contatti.error) {
      setErrors(contatti.error);
    } else {
      // Se ricerco un nome di figlio devo fare un'altra fetch per avere tutti i figli della madre visualizzati nella ricerca
      if(contatti.length == 1) {
        const res = await fetch("http://localhost:3032/cercaContatto", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ idMadre: contatti[0].idMadre })
        })
        const allContacts = await res.json();
        return setData(allContacts)
      }


      setData(contatti);
    }
  };

  useEffect(() => {
    setContattiUnici([
      ...new Map(data.map((item) => [item["idMadre"], item])).values(),
    ]);
  }, [data]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
 
 
  const handleReset = () => {
    setInputs("")
  }

  

  if (risUpdate) return <AggiornaUsers contattoMadre={contatto} madri={data} />;

  return (
    <div>
        <div className={styles.navbarCerca}>
            <NavbarIconCerca/>
        </div>
        
      <table className={styles.containerRicerca}>
          <h1>Ricerca contatto</h1>
        <tbody>
          <tr>
            <td className={styles.inputLabel}><label>Nome</label></td>
            <td>
              <input name="nome" onChange={handleInput} />
            </td>
            <br />
          </tr>
          <tr>
          <td className={styles.inputLabel}><label>Cognome</label></td>
            <td>
              <input name="cognome" onChange={handleInput} />
            </td>
            <br />
          </tr>
          
          <tr>
              <td className={styles.inputLabel}><label>Città di residenza</label></td>
            <td>
              <input name="cittaResidenza" onChange={handleInput} />
            </td>
            <br />
          </tr>
          <tr>
          <td className={styles.inputLabel}><label>Indirizzo</label></td>
            <td>
              <input name="indirizzo" onChange={handleInput} />
            </td>
            <br />
          </tr>
          <tr>
            <td className={styles.inputLabel}><label>Provincia di residenza</label></td>
            <td>
              <input name="provinciaResidenza" onChange={handleInput} />
            </td>
            <br />
          </tr>
          <tr>
            <td className={styles.inputLabel}><label>Città di nascita</label></td>
            <td>
              <input name="cittaNascita" onChange={handleInput} />
            </td>
            <br />
          </tr>
          <tr>
            <td className={styles.inputLabel}><label>Anno di nascita</label></td>
            <td>
              <input name="annoNascita" onChange={handleInput} />
            </td>
            <br />
          </tr>
          <tr>
            <td className={styles.inputLabel}><label>Codice fiscale</label></td>
            <td>
              <input name="codiceFiscale" onChange={handleInput} />
            </td>
            <br />
          </tr>
          <tr>
            <td className={styles.inputLabel}><label>Nomde del figlio</label></td>
            <td>
              <input name="nomeFiglio" onChange={handleInput} />
            </td>
            <br />
          </tr>
          <tr>
            <td className={styles.inputLabel}><label>Anni del figlio</label></td>
            <td>
              <input name="anniFiglio" onChange={handleInput} />
            </td>
            <br />
          </tr>
        </tbody>
        <div className={styles.btnCercaContainer}>
            <button onClick={handleCerca} className={styles.cercaUtenti}>CERCA</button>
            <button onClick={handleReset} className={styles.resetUtenti}>RESET</button>
        </div>
        
      </table>

      <p className={styles.numeroTrovati}>Sono presenti {contattiUnici.length} nominativi</p>
      <div>
        {errors.map((e, i) => {
          return <h1 key={i}>{e.message}</h1>;
        })}
      </div>
      <div className={styles.containerElencoMadri}>
        {contattiUnici.map((e, i) => {
          return (
            <tr
              key={i}
              onClick={() => {
                setRisUpdate(true);
                setContatto(e);
              }}
              className={styles.trClick}
            >
              <td className={styles.tdCerca}>{e.nome}</td>
              <td className={styles.tdCerca}>{e.cognome}</td>
            </tr>
          );
        })}
      </div>
    </div>
  );
};

export default CercaUser;
