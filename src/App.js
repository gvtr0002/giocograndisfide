
import React, { useState } from 'react';
import Mappa from './Mappa';
import Domanda from './Domanda';

function App() {
  const [giocatore, setGiocatore] = useState(null);
  const [zonaSelezionata, setZonaSelezionata] = useState(null);
  const [fase, setFase] = useState('login');
  const [zonaBloccata, setZonaBloccata] = useState([]);

  const startGame = (squadra) => {
    setGiocatore(squadra);
    setFase('mappa');
  };

  const gestisciRisposta = (zona, esito) => {
    if (esito === 'conquistata') {
      setZonaBloccata([...zonaBloccata, zona]);
      alert("Zona conquistata!");
    }
    setFase('mappa');
  };

  return (
    <div>
      {fase === 'login' && (
        <div>
          <h1>Gioco Grandisfide</h1>
          <button onClick={() => startGame('verde')}>Giocatore Verde</button>
          <button onClick={() => startGame('rosso')}>Giocatore Rosso</button>
        </div>
      )}
      {fase === 'mappa' && (
        <Mappa
          giocatore={giocatore}
          zoneBloccate={zonaBloccata}
          onZonaSelezionata={(zona) => {
            if (!zonaBloccata.includes(zona)) {
              setZonaSelezionata(zona);
              setFase('domanda');
            } else {
              alert("Zona già conquistata!");
            }
          }}
        />
      )}
      {fase === 'domanda' && (
        <Domanda
          zona={zonaSelezionata}
          squadra={giocatore}
          onRisposta={(esito) => gestisciRisposta(zonaSelezionata, esito)}
        />
      )}
    </div>
  );
}
export default App;
