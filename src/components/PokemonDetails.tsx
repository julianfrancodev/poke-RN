import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonInterfaces';

interface Props {
    pokemon: PokemonFull
}

function PokemonDetails(props: Props) {
    const { pokemon } = props

    return (
        <View
            style={{
                marginTop: 30
            }}
        >


            <View style={{
                ...styles.container,
            }}>
                <Text style={styles.title}>
                    Types:
                </Text>

                <View
                    style={{ flexDirection: 'row' }}
                >
                    {
                        pokemon.types.map(({ type }) => {
                            console.log(type.name);
                            return (


                                <Text
                                    style={{ ...styles.regularText, marginRight: 10 }}
                                    key={type.name}
                                >
                                    {type.name}
                                </Text>
                            )
                        })
                    }
                </View>

                {/* Peso */}
                <Text style={styles.title}>
                    Peso:
                </Text>

                <Text style={styles.regularText}>
                    {pokemon.weight} Kg
                </Text>


            </View>

            <View style={{
                ...styles.container,
            }}>
                <Text style={styles.title}>
                    Sprites:
                </Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >

                <Image
                    source={{ uri: pokemon.sprites.front_default }}
                    style={styles.basicSprite}
                />
                <Image
                    source={{ uri: pokemon.sprites.back_default }}
                    style={styles.basicSprite}
                />
                <Image
                    source={{ uri: pokemon.sprites.front_shiny }}
                    style={styles.basicSprite}
                />
                <Image
                    source={{ uri: pokemon.sprites.back_shiny }}
                    style={styles.basicSprite}
                />

            </ScrollView>


            <View style={{
                ...styles.container,
            }}>
                <Text style={styles.title}>
                    Habilidates Base:
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.abilities.map(({ ability }) => {
                            return (


                                <Text
                                    style={{ ...styles.regularText, marginRight: 10 }}
                                    key={ability.name}
                                >
                                    {ability.name+ ','}
                                </Text>
                            )
                        })
                    }
                </View>
            </View>

            <View style={{
                ...styles.container,
            }}>
                <Text style={styles.title}>
                    Moviemientos Base:
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        pokemon.moves.map(({ move }) => {
                            return (
                                <Text
                                    style={{ ...styles.regularText, marginRight: 10 }}
                                    key={move.name}
                                >
                                    {move.name+ ','}
                                </Text>
                            )
                        })
                    }
                </View>
            </View>


            <View style={{
                ...styles.container,
            }}>
                <Text style={styles.title}>
                    Moviemientos Base:
                </Text>
                <View style={{ flexWrap: 'wrap' }}>
                    {
                        pokemon.stats.map((stat, i ) => {
                            return (

                                <View key={stat.stat.name + i} style={{flexDirection: 'row'}}>
                                <Text
                                    style={{ ...styles.regularText, marginRight: 10, width: 150, fontWeight:'bold' }}
                                >
                                    {stat.stat.name.toUpperCase() + ':'}
                                </Text>
                                <Text
                                    style={{ ...styles.regularText, marginRight: 10 }}
                                >
                                    {stat.base_stat}
                                </Text>

                                </View>
                            )
                        })
                    }
                </View>
            </View>

        </View>
    )
}

export default PokemonDetails;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 29,
        marginTop: 20

    },
    regularText: {
        fontSize: 19
    },
    basicSprite: {
        width: 100,
        height: 100
    }
})
