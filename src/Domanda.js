import React, { useEffect, useState } from 'react';
import domande from './domande.json';

const Domanda = ({ zona, squadra, onRisposta }) => {
  const [turno, setTurno] = useState(squadra); // turno inizia dal giocatore attivo
  const [tentativi, setTentativi] = useState(0);
  const [domandaCorrente, setDomandaCorrente] = useState(null);
  const [risposteMostrate, setRisposteMostrate] = useState([]);

  const avversario = squadra === 'verde' ? 'rosso' : 'verde';

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
      // GIOCATORE ATTIVO
      if (corretta) {
        alert("Hai conquistato la zona!");
        onRisposta("conquistata");
      } else {
        setTurno(avversario);
      }
    } else {
      // AVVERSARIO CHE PROVA A RUBARE PUNTI
      if (corretta) {
        alert("+2 punti all'altra squadra!");
        onRisposta("punti_avversario");
      } else {
        if (tentativi < 2) {
          setTentativi(t => t + 1);
          setTurno(squadra);
          caricaNuovaDomanda();
        } else {
          alert(`${squadra.toUpperCase()} ha sbagliato 3 volte. Zona conquistata!`);
          onRisposta("conquistata");
        }
      }
    }
  };

  const opzioni = turno === avversario && tentativi > 0
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
      <p>Tentativi {squadra.toUpperCase()}: {tentativi}/3</p>
    </div>
  );
};

export default Domanda;
