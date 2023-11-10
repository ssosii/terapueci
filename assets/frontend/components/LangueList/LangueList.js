import { h, render } from 'preact';
import "./langueList.scss";

const LangueList = ({ type, list, setLanguesSelected, languesSelected }) => {
   
    // const currentList = list[type];
    // const currentCategoriesSelected =  categoriesSelected[type];

    const handleListLangues = (id) => {
        let newLanguesSelected = [...languesSelected];
        const isExist = newLanguesSelected.find(item => item === id);
        console.log("isExist",isExist);
        if (isExist) {
            newLanguesSelected = newLanguesSelected.filter(item => item !== id);
            console.log("isExist",newLanguesSelected);
        } else {
            newLanguesSelected.push(id);

        }

        setLanguesSelected(newLanguesSelected);
    }


    return (
        <div className={`category--list`}>
            {list.map(langue => (
                <div onClick={() => handleListLangues(langue.id)} className={`item ${languesSelected.find(item => item === langue.id) ? "--active" : ""}`}>
                    {languesSelected.find(item => item === langue.id) && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M6.74914 12.1279L3.62164 9.00037L2.55664 10.0579L6.74914 14.2504L15.7491 5.25037L14.6916 4.19287L6.74914 12.1279Z" fill="#0A2100" />
                        </svg>
                    )}
                    {langue.name}
                </div>
            ))}
        </div>
    )
}

export { LangueList }