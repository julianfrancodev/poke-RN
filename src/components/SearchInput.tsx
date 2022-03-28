import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebounceValues } from '../hooks/useDebounceValue';

interface Props { 
    style?: StyleProp<ViewStyle>,
    onDebounce: (value: string)=> void
}

function SearchInput(props: Props) {
    const { style, onDebounce } = props;

    const [textValue, settextValue] = useState('');


    const debouncedValue = useDebounceValues(textValue);


    useEffect(() => {
        onDebounce(debouncedValue);
    }, [debouncedValue])
    

    return (
        <View style={{...styles.container, ...style as any}}>
            <View style={styles.textBackground}>
                <TextInput
                    placeholder='Buscar Pokemon'
                    style={styles.textInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={textValue}
                    onChangeText={(value)=> settextValue(value)}
                />

                <Icon
                    name='search-outline'
                    color={'grey'}
                    size={25}

                />
            </View>
        </View>
    )
}

export default SearchInput;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    textBackground: {
        backgroundColor: '#f3f1f3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,

    },
    textInput: {
        flex: 1,
        fontSize: 16
    }
});
