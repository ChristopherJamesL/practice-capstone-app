import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context'; 
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { 
    ProductCardContainer,
    ProductImage,
    Footer,
    ProductName,
    ProductPrice
} from './product-card.styles';

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;
    const { addItemToCart } = useContext(CartContext);
    const addProductToCart = () => addItemToCart(product);
    
    return (
        <ProductCardContainer >
            <ProductImage  src={imageUrl} alt={`${name}`} />
            <Footer >
                <ProductName >{name}</ProductName>
                <ProductPrice >{price}</ProductPrice>
            </Footer>
            <Button 
                buttonType={BUTTON_TYPE_CLASSES.inverted} 
                onClick={addProductToCart} 
            >
                Add To Cart
            </Button>
        </ProductCardContainer>
    )
}

export default ProductCard