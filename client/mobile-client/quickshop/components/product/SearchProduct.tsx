import React from 'react'
import { StyleSheet, Text } from 'react-native';
import { View } from '../Themed'
import { TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { router } from 'expo-router';

function SearchProduct() {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput 
                    onPressIn={() => router.push('/product/search')} 
                    style={styles.searchInput} 
                    placeholder='Search product'
                />
                <Feather size={25} name='search' color={Colors.secondary_first}/>
            </View>
            {/* <View style={styles.suggestionContainer}>
                <Text style={styles.suggestionTitle}>Suggestions</Text>
                <View style={styles.suggestions}>
                    <Text>Product 1</Text>
                </View>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 5,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: Colors.primary,
    },
    searchInput: {
        flex: 1,
        fontSize: 18
    },
    suggestionContainer: {
        position: 'absolute',
        width: '100%',
        height: 100,
        top: 50,
        left: 0,
        padding: 10,
    },
    suggestionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.secondary_first,
    },
    suggestions: {
        marginTop: 10,
    }
})
export default SearchProduct
