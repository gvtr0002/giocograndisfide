
import React, { useEffect, useState } from 'react';
import domande from './domande.json';

const Domanda = ({ zona, squadra, onRisposta }) => {
  const [turno, setTurno] = useState('verde');
  const [tentativiVerde, setTentativiVerde] = useState(0);
  const [domandaCorrente, setDomandaCorrente] = useState(null);
  const [risposteMostrate, setRisposteMostrate] = useState([]);

  useEffect(() => {
    caricaNuovaDomanda();
  }, []);

  const caricaNuovaDomanda = () => {
    const filtrate = domande.filter((d) => d.zona === zona);
    const casuale = filtrate[Math.floor(Math.random() * filtrate.length)];
    setDomandaCorrente(casuale);
    setRisposteMostrate([casuale.corretta, ...casuale.sbagliate].sort(() => 0.5 - Math.random()));
  };

  const gestisciRisposta = (risposta) => {
    const corretta = risposta === domandaCorrente.corretta;

    if (turno === squadra) {
      if (corretta) {
        alert("Hai conquistato la zona!");
        onRisposta("conquistata");
      } else {
        setTurno(squadra === "verde" ? "rosso" : "verde");
      }
    } else {
      if (corretta) {
        alert("+2 punti all'altra squadra!");
        setTurno(squadra);
        caricaNuovaDomanda();
      } else {
        if (tentativiVerde + 1 >= 3) {
          alert("Verde ha sbagliato 3 volte. Zona conquistata!");
          onRisposta("conquistata");
        } else {
          setTentativiVerde(t => t + 1);
          setTurno(squadra);
          caricaNuovaDomanda();
        }
      }
    }
  };

  const opzioni = turno !== squadra
    ? risposteMostrate.filter(r => r !== domandaCorrente.sbagliate[0])
    : risposteMostrate;

  if (!domandaCorrente) return <p>Caricamento domanda...</p>;

  return (
    <div>
      <h3>{domandaCorrente.domanda}</h3>
      {opzioni.map((opzione, i) => (
        <button key={i} onClick={() => gestisciRisposta(opzione)} style={{ margin: '10px', display: 'block' }}>
          {opzione}
        </button>
      ))}
      <p>Turno: {turno.toUpperCase()}</p>
      <p>Tentativi Verde: {tentativiVerde}/3</p>
    </div>
  );
};

export default Domanda;
