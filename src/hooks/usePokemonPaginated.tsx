import { useEffect, useRef, useState } from "react";
import { pokemonApi } from '../api/pokemonApi';
import { PokemonResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';


export const usePokemonPaginated = ()=> {

    const [isLoading, setisLoading] = useState(false);

    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const loadPokemons = async ()=>{

        setisLoading(true);

        const resp = await pokemonApi.get<PokemonResponse>(nextPageUrl.current);

        nextPageUrl.current = resp.data.next;

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


        setSimplePokemonList([...simplePokemonList, ...newPokemonList]);


        setisLoading(false);



    }

    useEffect(() => {
    
        loadPokemons();
        
        
    }, [])


    return {
        simplePokemonList,
        isLoading,
        loadPokemons
    }
    

}