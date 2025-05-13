import ProductCard from '../product-card/product-card.component';
import { 
    CategoryPreviewContainer, 
    CategoryTitleContainer, 
    CategoryTitle, 
    Preview 
} from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer >
            <CategoryTitleContainer >
                <CategoryTitle to={title} className='title' >{title.toLocaleUpperCase()}</CategoryTitle>
            </CategoryTitleContainer>
            <Preview >
                {
                    products
                        .filter((_, index) => index < 4)
                        .map(product => <ProductCard key={product.id} product={product} />)
                }
            </Preview>
        </CategoryPreviewContainer>
    )
};

export default CategoryPreview;