import React, { useEffect } from 'react'
import { View, Text, Platform, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { globalStyles } from '../theme/appTheme';
import { useState } from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

interface Props { }

const screenWidth = Dimensions.get('window').width;

function SearchScreen(props: Props) {
    const { } = props;

    const { top } = useSafeAreaInsets();

    const [pokemonFiltered, setpokemonFiltered] = useState<SimplePokemon[]>([]);

    const { isFetching, simplePokemonList } = usePokemonSearch();

    const [term, settemp] = useState('');


    useEffect(() => {

        if(term.length === 0){
            return setpokemonFiltered([]);
        }

        if(isNaN(Number(term))){

            setpokemonFiltered(
                simplePokemonList.filter(
                    (poke)=> poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
                    )
            );
        }else{
            setpokemonFiltered(
                [simplePokemonList.find((poke)=> poke.id === term)!]
            );
        }
      
    
    }, [term])
    


    if (isFetching) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={30} color={'red'} />
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            marginHorizontal: 20
        }}>

            <SearchInput
                onDebounce={(value)=> settemp(value)}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: (Platform.OS === 'ios') ? top : top + 30
                }}
            />


            <FlatList
                ListHeaderComponent={() => (
                    <Text style={{
                        ...globalStyles.title,
                        paddingBottom: 10,
                        ...globalStyles.globalMargin,
                        marginTop: (Platform.OS === 'ios') ? top + 60 : top + 80

                    }}>
                        {term}
                    </Text>
                )}
                data={pokemonFiltered}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                keyExtractor={(pokemon) => pokemon.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            // INFINITE SCROLL
            />

        </View>
    )
}

export default SearchScreen
