import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItemsContainer, EmptyMessage } from './cart-dropdown.styles';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => navigate('/checkout');
    
    return (
        <CartDropdownContainer >
            <CartItemsContainer>
                {cartItems.length ? (
                    cartItems.map(item => {
                       return <CartItem key={item.id} cartItem={item} />
                   })
                ) : (
                    <EmptyMessage>Your Cart Is Empty</EmptyMessage>
                )}
            </CartItemsContainer>
            <Button onClick={goToCheckoutHandler} >GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;