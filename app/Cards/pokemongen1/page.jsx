'use client';

import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function PokemonGen1Page() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const min = 1;
        const max = 151;

        const uniqueRandomIds = new Set();
        while (uniqueRandomIds.size < 10) {
          uniqueRandomIds.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }

        const pokemonPromises = [...uniqueRandomIds].map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
        );

        const results = await Promise.all(pokemonPromises);
        setPokemons(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);
// mostrar modal
  const handleShowModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };
// cerrar modal
  const handleCloseModal = () => {
    setSelectedPokemon(null);
    setShowModal(false);
    window.location.href = '/'; // Redirige al home
  };

  if (loading) {
    return <div><img src="/Loading_2.gif"></img></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>Pokemons de la generacion 1</div>
      <div className="cards-container">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3 className="card-title">{pokemon.name}</h3>
            <p className="card-text">ID: {pokemon.id}</p>
            <button
              className="more-info-button"
              onClick={() => handleShowModal(pokemon)}
            >
              Saber más
            </button>
          </div>
        ))}
      </div>

      {/* Modal*/}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{selectedPokemon?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPokemon && (
            <div>
              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
                style={{ maxWidth: '100px' }}
              />
              <p><strong>ID:</strong> {selectedPokemon.id}</p>
              <p><strong>Altura:</strong> {selectedPokemon.height}</p>
              <p><strong>Peso:</strong> {selectedPokemon.weight}</p>
              <p>
                <strong>Habilidades:</strong>{' '}
                {selectedPokemon.abilities.map((a) => a.ability.name).join(', ')}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Anterior
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Siguiente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}




