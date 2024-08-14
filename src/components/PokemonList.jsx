import React, { useEffect, useState } from "react";

function PokemonList() {
    const [currentList, setCurrentList] = useState([]);
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=0`);
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");

    const handleSiguiente = () => {
        if (next) {
            setUrl(next);
        }
    }

    const handleAnterior = () => {
        if (previous) {
            setUrl(previous);
        }
    }

    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // Mapea a una lista de promesas para obtener detalles adicionales
                Promise.all(data.results.map(pokemon =>
                    fetch(pokemon.url)
                        .then(resp => resp.json())
                        .then(details => ({
                            name: details.name,
                            image: details.sprites.front_default // Imagen frontal por defecto
                        }))
                ))
                .then(pokemonDetails => {
                    setCurrentList(pokemonDetails);
                    setNext(data.next);
                    setPrevious(data.previous);
                });
            });
    }, [url]);

    return (
        <div>
            {currentList.length > 0 ? (
                <div>
                    {currentList.map((pokemon) => (
                        <div key={pokemon.name}>
                            <img src={pokemon.image} alt={pokemon.name} width="50" height="50" />
                            <h3>{pokemon.name}</h3>
                        </div>
                    ))}    
                    <br/>
                    <button onClick={handleAnterior} disabled={!previous}>Anterior</button>
                    <button onClick={handleSiguiente} disabled={!next}>Siguiente</button>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default PokemonList;
