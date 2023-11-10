import { h, render } from 'preact';
import "./categoryList.scss";

const CategoryList = ({ type, list, setCategoriesSelected, categoriesSelected }) => {
    const currentList = list[type];
    const currentCategoriesSelected =  categoriesSelected[type];

    const handleSelectCategory = (id) => {
        const newSelectedFullList = { ...categoriesSelected };
        let newSelectedList = [...categoriesSelected[type]];
        const isExist = newSelectedList.find(item => item.id == id);

        if (isExist) {
            newSelectedList = newSelectedList.filter(item => item.id !== id);
            setCategoriesSelected({ ...newSelectedFullList, [type]: newSelectedList });
        } else {
            const newCategory = currentList.find(item => item.id === id);
            setCategoriesSelected({ ...categoriesSelected, [type]: [...categoriesSelected[type], newCategory] });
        }
    }


    return (
        <div className={`category--list`}>{currentList.map(category => (
            <div onClick={() => handleSelectCategory(category.id)} className={`item ${currentCategoriesSelected.find(item => item.id === category.id) ? "--active" : ""}`}>
                {currentCategoriesSelected.find(item => item.id === category.id) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M6.74914 12.1279L3.62164 9.00037L2.55664 10.0579L6.74914 14.2504L15.7491 5.25037L14.6916 4.19287L6.74914 12.1279Z" fill="#0A2100" />
                    </svg>
                )} {category.name}</div>))}
        </div>
    )
}

export { CategoryList }