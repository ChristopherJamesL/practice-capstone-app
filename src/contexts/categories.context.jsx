import { createContext, useEffect, useState } from "react";
import { getCollectionsAndDocuments } from "../utils/firebase/firebase.utils";


export const CategoriesContext = createContext({
    categoriesMap: {}
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategories] = useState({});

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCollectionsAndDocuments('categories');
            setCategories(categoryMap);
        }
        getCategoryMap();
    }, [])

    const value = { categoriesMap };

    return <CategoriesContext.Provider value={value} >{children}</CategoriesContext.Provider>;
}