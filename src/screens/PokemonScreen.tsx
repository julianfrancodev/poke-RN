import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { RootStackParams } from '../navigator/Navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemon } from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { }

function PokemonScreen(props: Props) {
    const { route, navigation } = props;
    const { simplePokemon, color } = route.params;


    const { pokemon, isLoading } = usePokemon(simplePokemon.id);


    console.log(pokemon)

    const { top } = useSafeAreaInsets();
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>


            <View style={{
                ...styles.headerContainer,
                backgroundColor: color,

            }}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.8}
                    style={{
                        ...styles.backButton,
                        top: top + 10
                    }}
                >

                    <Icon
                        name='arrow-back-circle-outline'
                        color={'white'}
                        size={35}
                    />

                </TouchableOpacity>


                {/* Nombre del pokemon */}

                <Text style={{
                    ...styles.pokemonName,
                    top: top + 50
                }}>
                    {simplePokemon.name + '\n'}#{simplePokemon.id}
                </Text>


                {/* Pokebola Blanca */}


                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={{
                        ...styles.pokebola
                    }}
                />

                <Image
                    source={{ uri: simplePokemon.url }}
                    style={styles.pokemon}
                />



            </View>

            {/* Detalles y Loading */}


            {
                isLoading ?

                    (

                        <View
                            style={styles.activityIndicator}
                        >
                            <ActivityIndicator color={color} size={50} />
                        </View>
                    ) : <PokemonDetails pokemon={pokemon} />
            }




        </ScrollView>
    )
}

export default PokemonScreen;

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    backButton: {
        position: 'absolute',
        left: 30,
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 30
    },
    pokebola: {
        width: 240,
        height: 240,
        bottom: -40,
        opacity: 0.7
    },
    pokemon: {
        width: 200,
        height: 200,
        position: 'absolute',
        bottom: -30
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
