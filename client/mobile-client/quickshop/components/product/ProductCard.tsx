import React from 'react'
import {View, Image, Text, StyleSheet} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Product } from '../../types/product.types';
import { API_END_POINT } from '../../constants/Services';
import { Link, router } from 'expo-router';

interface Props {
    data: Product;
}

function ProductCard(props: Props) {
    const {data} = props;
    const productImages = `${API_END_POINT}/uploads/products/${data.images[0]}`;

    return (
        <View style={styles.container}>
            <View 
                style={{
                    backgroundColor: '#FFF', 
                    borderWidth: 1,
                    borderColor: '#d8d8d8',
                    borderRadius: 5
                }}
            >
                <TouchableOpacity onPress={() => router.push(`/product/${data._id}`)}>
                    <Image 
                        style={styles.productImage}
                        source={{uri: productImages}} 
                    />
                </TouchableOpacity>
                <View style={{padding: 5}}>
                    <Text 
                        style={styles.prductTitle}
                    >
                        {data.title}
                    </Text>
                    <Text style={styles.productPrice}>
                        ₱ {data.price.toLocaleString()}
                    </Text>
                    <View style={styles.flexRow}>
                        <View 
                            style={{
                                ...styles.starRate, 
                                ...styles.flexRow
                            }}
                        >
                            <AntDesign 
                                style={{paddingRight: 5}} 
                                color='#F4B509' 
                                size={20} 
                                name='star'
                            />
                            <Text>{100}</Text>
                        </View>
                        <TouchableOpacity 
                            style={{
                                ...styles.addCart,
                                ...styles.flexRow
                            }}
                        >
                            <Feather
                                style={{
                                    paddingRight: 5,
                                    color: Colors.secondary_first
                                }}
                                size={20}
                                name='shopping-cart'
                            />
                            <Text
                                style={{
                                    color: Colors.secondary_first
                                }}
                            >
                                Add Cart
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        width: '50%',
        padding: 5,
    },
    productImage: {
        width: '100%',
        height: 130,
        backgroundColor: '#f8f8f8',
        objectFit: 'contain',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    prductTitle: {
        fontSize: 16,
        fontWeight: '600',
        alignItems: 'center',
        color: Colors.secondary_first
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.accent,
    },
    starRate: {
        paddingVertical: 5, 
    },
    addCart: {
        paddingVertical: 5,
        paddingHorizontal: 10, 
        textAlign: 'center',
    }
})

export default ProductCard
