import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { useState, useEffect, useRef } from 'react';
import ImageColors from 'react-native-image-colors'
import { useNavigation } from '@react-navigation/native';

interface Props {
    pokemon: SimplePokemon
}

const width = Dimensions.get('window').width;

function PokemonCard(props: Props) {
    const { pokemon } = props;

    const navigation =  useNavigation();


    const [bgColor, setbgColor] = useState('grey');

    const isMounted = useRef(true);



    useEffect(() => {       

        ImageColors.getColors(pokemon.url, {fallback: 'grey'})
        .then((colors) : any =>{

            if(isMounted.current === false) return;

            ( colors.platform === 'android' )
                    ? setbgColor( colors.dominant || 'grey' )
                    : setbgColor( colors.background || 'grey' )
        })

        return ()=>{
            isMounted.current === false;
        }
      
    }, [bgColor])
    

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={()=> navigation.navigate('PokemonScreen', {simplePokemon: pokemon, color: bgColor})}
        >
            <View style={{
                ...styles.cardContainer,
                width: width * 0.4,
                backgroundColor: bgColor
            }}>

                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokebolaContainer}>
                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={styles.pokebola}
                />

                </View>


                <Image
                    source={{ uri: pokemon.url }}
                    style={styles.pokemonImage}
                />

            </View>
        </TouchableOpacity>
    )
}

export default PokemonCard;

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        backgroundColor: 'grey',
        height: 120,
        width: 150,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        opacity: 0.5,
        right: -20,
        bottom: -20
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer:{
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow:'hidden'
    }
})