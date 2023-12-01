import { AntDesign, Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { 
    Text, 
    View, 
    StyleSheet, 
    TextInput, 
    Image, 
    TouchableOpacity, 
    ActivityIndicator
} from 'react-native'
import Colors from '../../constants/Colors'
import { router } from 'expo-router'
import { searchProduct } from '../../services/product.services'
import { Product } from '../../types/product.types'
import { AxiosError } from 'axios'
import { API_END_POINT } from '../../constants/Services'

export default function SearchScreen() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<Product[]>([]);
    const [searchError, setSearchError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(searchTerm) {
            setLoading(true);
            searchProduct(searchTerm)
                .then((response) => {
                    const products: Product[] = response.data.products;
                    setSearchResult(products);
                })
                .catch((error: AxiosError) => {
                    setSearchError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [searchTerm]);

    const renderSearchResult = (product: Product) => (
        <TouchableOpacity 
            style={styles.searchResult} 
            onPress={() => router.push(`/product/${product._id}`)}
            key={product._id}
        >
            <Image
                style={styles.productImage}
                source={{uri: `${API_END_POINT}/uploads/products/${product.images[0]}`}}
            />
            <Text style={styles.productTitle}>
                {product.title}
            </Text> 
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign
                    size={25} 
                    color={Colors.accent} 
                    style={{paddingHorizontal: 20}}
                    name='back'
                    onPress={() => router.back()}
                />
                <View 
                    style={styles.searchBar}
                >
                    <TextInput 
                        style={styles.searchInput} 
                        placeholder='Search product'
                        autoFocus={true}
                        onChangeText={(text) => setSearchTerm(text)}
                    />
                    <AntDesign 
                        size={25} 
                        color={Colors.secondary_first}
                        name='search1'/>
                </View>
            </View>
            <View style={styles.mainContent}>
                <View style={styles.recentSearches}>
                    <Text 
                        style={styles.recentSearchesTitle}
                    >
                        Recent Searches
                    </Text>
                    <Text>Empty</Text>
                </View>
                {searchTerm 
                    && (
                        <View
                            style={styles.searchResults}
                        >
                            <Text 
                                style={styles.searchResultTitle}
                            >
                                Search Results
                            </Text>
                            {loading 
                                ? ( <ActivityIndicator 
                                        color={Colors.secondary_third}
                                        size={25}
                                    />)
                                : (
                                    searchResult?.map((product) => (
                                        renderSearchResult(product)
                                    ))
                                )}
                            {searchResult?.length <= 0 && (
                                <Text>No results found</Text>
                            )}
                            {searchError && (<Text>{searchError}</Text>)}
                        </View>
                    )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingTop: 45,
        paddingBottom: 15,
        backgroundColor: Colors.secondary_first,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBar: {
        flex: 1,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    mainContent: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    searchInput: {
        flex: 1,
        fontSize: 18,
    },
    recentSearches: {
        padding: 10,
    },
    searchResults: {
        position: 'absolute',
        width: '100%',
        backgroundColor: Colors.primary,
        padding: 10,
    },
    searchResult: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    recentSearchesTitle: {
        fontSize: 15,
        fontWeight: '600',
    },
    searchResultTitle: {
        fontSize: 15,
        fontWeight: '600',
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 50 / 2,
    },
    productTitle: {
        fontSize: 15,
        fontWeight: '600',
    },
})
