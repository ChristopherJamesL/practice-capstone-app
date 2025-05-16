import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCollectionsAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.actions';
import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCollectionsAndDocuments('categories');
            dispatch(setCategories(categoriesArray));
        }
        getCategoriesMap();
    }, [dispatch]);

    return (
            <Routes>
                <Route index element={<CategoriesPreview />} />
                <Route path=":category" element={<Category />} />
            </Routes>
    );
};

export default Shop;