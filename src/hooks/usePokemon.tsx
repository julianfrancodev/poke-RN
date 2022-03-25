import React, { useState, useEffect } from 'react';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { pokemonApi } from '../api/pokemonApi';


export const usePokemon = (id: string )=>{

    const [isLoading, setisLoading] = useState(true);

    const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);

    useEffect(() => {
     loadPokemon();
    }, [])
    

    const loadPokemon = async()=>{
        const resp = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`);

        setPokemon(resp.data);

        setisLoading(false);
    }



    return {
        isLoading,
        pokemon
    }

}