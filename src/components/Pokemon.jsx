import React, { useState, useEffect } from "react";

function Pokemon() {
    // Define el estado pokemon y la función setPokemon
    const [pokemon, setPokemon] = useState(null);
    const[id,setId] =useState (1);
    const handleAnterior = ()=>{
        id> 1 && setId(id-1);
    }
    const handleSiguiente = ()=>{
        setId(id+1);
    }
    console.log(id);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((respuesta) => respuesta.json())
            .then((data) => {
                setPokemon(data); // Usa la función setPokemon para actualizar el estado
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, [id]); // El array vacío [] asegura que el fetch se realice solo una vez cuando el 
              //componente se monte....al colocar id el componenete se actualiza solo cuando id se actualiza

    return (
        <div>
            {pokemon ? (
                <div>
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <br/>
                  {id>1? (<button onClick={handleAnterior}>Anterior</button>):<button disabled>Anterior</button>}  
                    <button onClick={handleSiguiente}>Siguiente</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Pokemon;
