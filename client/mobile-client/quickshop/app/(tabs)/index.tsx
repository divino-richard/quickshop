import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Feather from '@expo/vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';
import ProductCard from '../../components/product/ProductCard';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { getProducts } from '../../services/product.services';
import { AxiosError, AxiosResponse } from 'axios';
import { 
  getProductsSuccess, 
  getProductsFailed, 
  setLoading 
} from '../../redux/slice/product/getProducts.slice';
import { Product } from '../../types/product.types';
import SearchProduct from '../../components/product/SearchProduct';
import Empty from '../../components/Empty';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const {products, error, loading} = useSelector((state: RootState) => state.getProducts);
   
  useEffect(() => {
    dispatch(setLoading(true));
    getProducts()
      .then((result: AxiosResponse)  => {
        if(result.data.products) {
          const products: Product[] = result.data.products;
          dispatch(getProductsSuccess(products));
        }
      })
      .catch((error: AxiosError) => {
        dispatch(getProductsFailed(error.message));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <SearchProduct />
        <View style={styles.headerActions}>
          <Feather 
            style={styles.actionIcon} 
            size={25} 
            name='shopping-cart'
          />
          <Feather 
            style={styles.actionIcon} 
            size={25} 
            name='bell'
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.productList} >
        {
          products.length > 0
            ? (
              products.map((product) => (
                <ProductCard key={product._id} data={product}/>
              ))
            )
            : (
              <Empty info='Empty Products'/>
            )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    prosition: 'relative',
    zIndex: 1,
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary_first,
  },
  headerActions: {
    flexDirection: 'row',
    marginLeft: 10, 
    backgroundColor: Colors.secondary_first,
  },
  actionIcon: {
    paddingHorizontal: 5,
    color: Colors.accent,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 5,
  }
});
