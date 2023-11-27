import React, { useEffect } from 'react'
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { getProduct } from '../../services/product.services';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Product } from '../../types/product.types';
import { 
    getProductFailed, 
    getProductLoading, 
    getProductSuccess 
} from '../../redux/slice/product/getProduct.slice';
import { AxiosError } from 'axios';
import Loading from '../../components/Loading';
import { ScrollView } from 'react-native-gesture-handler';
import { API_END_POINT } from '../../constants/Services';
import Colors from '../../constants/Colors';
import { Feather, AntDesign } from '@expo/vector-icons';

function ProductDetails() {
    const params = useLocalSearchParams<{id: string}>();
    const dispatch = useDispatch<AppDispatch>();
    const {product, error, loading} = useSelector((state: RootState) => state.getProduct);
    
    useEffect(() => {
        dispatch(getProductLoading(true));
        getProduct(params.id)
            .then((result) => {
                const product: Product = result.data.product;
                dispatch(getProductSuccess(product));
            })
            .catch((error: AxiosError) => {
                dispatch(getProductFailed(error.message));
            })
            .finally(() => {
                dispatch(getProductLoading(false));
            })
    }, []);

    if(loading) {
        return <Loading />
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.productContainer}>
                <Image
                    style={styles.productImage} 
                    source={{uri: `${API_END_POINT}/uploads/products/${product?.images[0]}`}}
                />
                <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>{product?.title}</Text>
                    <Text style={styles.productPrice}>₱ {product?.price.toLocaleString()}</Text>
                    <TouchableOpacity style={styles.starRates}>
                        <Text style={{fontSize: 15}}>100k </Text>
                        <AntDesign 
                            style={{paddingRight: 5}} 
                            color='#F4B509' 
                            size={20} 
                            name='star'
                        />
                        <AntDesign 
                            style={{paddingRight: 5}} 
                            color='#F4B509' 
                            size={20} 
                            name='star'
                        />
                        <AntDesign 
                            style={{paddingRight: 5}} 
                            color='#F4B509' 
                            size={20} 
                            name='star'
                        />
                        <AntDesign 
                            style={{paddingRight: 5}} 
                            color='#F4B509' 
                            size={20} 
                            name='star'
                        />
                        <AntDesign 
                            style={{paddingRight: 5}} 
                            color='#F4B509' 
                            size={20} 
                            name='star'
                        />
                    </TouchableOpacity>
                    <View style={styles.productActions}>
                        <TouchableOpacity 
                            style={{
                                ...styles.actionButton, 
                                backgroundColor: Colors.accent
                            }}
                        >
                            <Feather size={15} color={Colors.primary} name='shopping-cart'/>
                            <Text style={styles.actionButtonText}>Add Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{
                                ...styles.actionButton,
                                backgroundColor: Colors.secondary_first,
                            }}
                        >
                            <Feather size={15} color={Colors.primary} name='shopping-bag'/>
                            <Text style={styles.actionButtonText} >Order Now</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.productDescription}>{product?.description}</Text>
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    productContainer: {
        backgroundColor: Colors.primary,
    },
    productImage: {
        width: '100%',
        height: 300,
        objectFit: 'contain',
        paddingVertical: 5,
    },
    productInfo: {
        padding: 10,
    },
    productTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.secondary_first, 
    },
    productPrice: {
        color: Colors.accent,
        fontWeight: '600',
        fontSize: 25,
        marginTop: 5,
    },
    starRates: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    productDescription: {
        marginTop: 5,
        fontSize: 15
    },
    productActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 10,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
    },
    actionButtonText: {
        paddingLeft: 10,
        color: Colors.primary,
        fontSize: 15,
        fontWeight: '600',
    }
})

export default ProductDetails
