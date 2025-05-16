import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { 
   CategoryComponentContainer,
   CategoryItemTitle,
   CategoryContainer
} from './category.styles';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap]);

    return (
        <CategoryComponentContainer >
            <CategoryItemTitle >{category.toLocaleUpperCase()}</CategoryItemTitle>
            <CategoryContainer >
                {products && products.map(product => (
                    <ProductCard  key={product.id} product={product} />
                ))}
            </CategoryContainer>
        </CategoryComponentContainer>
    );
};

export default Category;
