import { useEffect, useRef, useState } from "react";
import { pokemonApi } from '../api/pokemonApi';
import { PokemonResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';


export const usePokemonSearch = ()=> {

    const [isFetching, setisFetching] = useState(true);

    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);


    const loadPokemons = async ()=>{


        const resp = await pokemonApi.get<PokemonResponse>("https://pokeapi.co/api/v2/pokemon?limit=1200");

        mapPokemonList(resp.data.results);


    }

    const mapPokemonList = (pokemonList: Result[])=>{

        const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url})=>{
            
            const urlParts = url.split('/');
            
            const id = urlParts[urlParts.length -2 ];

            const urlPicture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

            return {
                id,
                url: urlPicture,
                name
            }

        })


        setSimplePokemonList(newPokemonList);


        setisFetching(false);



    }

    useEffect(() => {
    
        loadPokemons();
        
        
    }, [])


    return {
        simplePokemonList,
        isFetching,
    }
    

}