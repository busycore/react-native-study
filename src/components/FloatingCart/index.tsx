import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    const totalValue = products.reduce((acc, val) => {
      return acc + val.quantity * val.price;
    }, 0);
    // TODO RETURN THE SUM OF THE PRICE FROM ALL ITEMS IN THE CART

    return formatValue(totalValue);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    // TODO RETURN THE SUM OF THE QUANTITY OF THE PRODUCTS IN THE CART
    const total = products.reduce((acc, val) => {
      return acc + val.quantity;
    }, 0);
    return total;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
