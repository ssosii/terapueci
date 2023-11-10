import { h, render } from 'preact';
import "./masterCategoryList.scss";

const MasterCategoryList = ({ type, list, setCategoriesSelected, categoriesSelected }) => {


    const handleSelectCategory = (id) => {
        let newSelectedList = [...categoriesSelected];
        const isExist = newSelectedList.find(item => item.id == id);

        if (isExist) {
            newSelectedList = newSelectedList.filter(item => item.id !== id);
            setCategoriesSelected(newSelectedList);
        } else {
            const newCategory = list.find(item => item.id === id);
            setCategoriesSelected([...categoriesSelected, newCategory]);
        }
    }
console.log("list",list);

    return (
        <div className={`master-category--list`}>
            {list.map(category => (
            <div onClick={() => handleSelectCategory(category.id)} className={`item ${categoriesSelected.find(item => item.id === category.id) ? "--active" : ""}`}>
                {categoriesSelected.find(item => item.id === category.id) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M6.74914 12.1279L3.62164 9.00037L2.55664 10.0579L6.74914 14.2504L15.7491 5.25037L14.6916 4.19287L6.74914 12.1279Z" fill="#0A2100" />
                    </svg>
                )} {category.name}</div>))}
        </div>
    )
}

export { MasterCategoryList }