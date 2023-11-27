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

export default function TabOneScreen() {
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
        <View style={styles.searchBar}>
          <TextInput style={styles.searchInput} placeholder='Search product'/>
          <Feather size={25} name='search' color={Colors.secondary_first}/>
        </View>
        <View style={styles.headerActions}>
          <Feather style={styles.actionIcon} size={25} name='shopping-cart'/>
          <Feather style={styles.actionIcon} size={25} name='bell'/>
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
              <Text>Empty</Text>
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
    paddingTop: 45,
    paddingBottom: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary_first,
  },
  searchBar: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: Colors.primary,
  },
  searchInput: {
    flex: 1,
    fontSize: 18
  },
  headerActions: {
    flex: 1,
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
