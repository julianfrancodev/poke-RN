import React from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../theme/appTheme';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { FlatList } from 'react-native-gesture-handler';
import PokemonCard from '../components/PokemonCard';

interface Props {}

function HomeScreen(props: Props) {
    const {} = props


    const {top} = useSafeAreaInsets();


    const {simplePokemonList, isLoading, loadPokemons} = usePokemonPaginated();


    console.log(simplePokemonList);

    return (
        <>

            <Image
                source={require("../assets/pokebola.png")}
                style={globalStyles.pokeBg}
            />
            
            <View
            style={{
                alignItems: 'center'
            }}
            >

            <FlatList
            ListHeaderComponent={()=>(
                 <Text style={{...globalStyles.title, top: top +20,marginBottom: top +20,paddingBottom: 10, ...globalStyles.globalMargin}}>
                Pokedex
            </Text> 
            ) }
            data={simplePokemonList}
            renderItem={({item})=> <PokemonCard pokemon={item}/>}
            keyExtractor={(pokemon)=> pokemon.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            // INFINITE SCROLL
            onEndReached={loadPokemons}
            onEndReachedThreshold={0.4}
            ListFooterComponent={<ActivityIndicator style={{height: 100}} size={20} color={"orange"}/>}
            />
        </View>
           
        </>
    )
}

export default HomeScreen
