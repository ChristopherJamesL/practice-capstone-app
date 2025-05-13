import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { 
    CheckoutItemContainer,
    ImageContainer,
    CheckoutImage,
    AttributeContainer,
    Value,
    Quantity,
    Arrow,
    RemoveButton
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
    const { name, price, quantity, imageUrl } = cartItem;
    const { removeItemFromCart, addItemToCart, removeAllOfCartItem } = useContext(CartContext);

    const removeItemHandler = () => removeItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const clearItemHandler = () => removeAllOfCartItem(cartItem);    

    return (
        <CheckoutItemContainer >
            <ImageContainer >
                <CheckoutImage src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <AttributeContainer >
                <Value >{name}</Value> 
            </AttributeContainer>
            <Quantity >
                <Arrow onClick={removeItemHandler} >&#10094;</Arrow>
                <Value >{quantity}</Value>
                <Arrow onClick={addItemHandler} >&#10095;</Arrow>
            </Quantity>
            <AttributeContainer>
                <Value >{price}</Value>
            </AttributeContainer>
            <RemoveButton onClick={clearItemHandler} >&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
};

export default CheckoutItem;