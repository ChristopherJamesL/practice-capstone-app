import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const { name, price, quantity, imageUrl } = cartItem;
    const { removeItemFromCart, addItemToCart, removeAllOfCartItem } = useContext(CartContext);

    const removeItemHandler = () => removeItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const clearItemHandler = () => removeAllOfCartItem(cartItem);    

    return (
        <div className='checkout-item-container' >
            <div className='image-container' >
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name' >
                <span className='value' >{name}</span>             
            </span>
            <span className='quantity' >
                <div className='arrow' onClick={removeItemHandler} >&#10094;</div>
                <span className='value' >{quantity}</span>
                <div className='arrow' onClick={addItemHandler} >&#10095;</div>
            </span>
            <span className='price' >
                <span className='value' >{price}</span>
            </span>
            <div className='remove-button' onClick={clearItemHandler} >&#10005;</div>
        </div>
    )
};

export default CheckoutItem;