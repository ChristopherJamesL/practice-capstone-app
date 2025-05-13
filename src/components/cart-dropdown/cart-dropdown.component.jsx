import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItemsContainer } from './cart-dropdown.styles';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => navigate('/checkout');
    
    return (
        <CartDropdownContainer >
            <CartItemsContainer>
                {cartItems.map(item => {
                    return <CartItem key={item.id} cartItem={item} />
                })}
            </CartItemsContainer>
            <Button style={{"margin-top": "auto"}} onClick={goToCheckoutHandler} >GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;