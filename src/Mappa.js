
import React from 'react';

const zone = [
  "Nord America", "Sud America", "Europa", "Africa Settentrionale",
  "Africa Sub-Sahariana", "Asia Occidentale", "Asia Orientale",
  "Medio Oriente", "Oceania"
];

const Mappa = ({ giocatore, onZonaSelezionata, zoneBloccate }) => {
  return (
    <div>
      <h2>{giocatore.toUpperCase()} - Seleziona una zona</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {zone.map((zona) => (
          <button
            key={zona}
            style={{ margin: '10px', backgroundColor: zoneBloccate.includes(zona) ? '#ccc' : '#fff' }}
            onClick={() => onZonaSelezionata(zona)}
          >
            {zona}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Mappa;
