import { h, render } from 'preact';
import { DropdownList } from './DropdownList/DropdownList';
import { DropdownRangesList } from './DropdownList/DropdownRangesList';
import "./featuresMenu.scss";


const genderList = [
    { id: "woman", name: "Kobieta" },
    { id: "man", name: "Mężczyzna" },
    { id: "other", name: "Inna" },
]

const weekDays = [
    { id: 2, name: "Poniedziałek" },
    { id: 3, name: "Wtorek" },
    { id: 4, name: "Środa" },
    { id: 5, name: "Czwartek" },
    { id: 6, name: "Piątek" },
    { id: 7, name: "Sobota" },
    { id: 1, name: "Niedziela" },
]

const ranges = [
    { id: 8, name: "8:00 - 12:00" },
    { id: 12, name: "12:00 - 15:00" },
    { id: 15, name: "15:00 - 18:00" },
    { id: 18, name: "18:00 - 21:00" },
]


const FeaturesMenu = ({ masterCategoriesList, categoriesList, setSelectedCategories, selectedCategories }) => {


    return (
        <div className='features-menu'>
            <DropdownList type="masterCategories" isChecked={selectedCategories.masterCategories.length > 0} list={categoriesList["masterCategories"]} setSelectedItems={setSelectedCategories} selectedItems={selectedCategories} label="Rodzaj wizyty" />
            <DropdownList type="problem" isChecked={selectedCategories.problem.length > 0} list={categoriesList["problem"]} setSelectedItems={setSelectedCategories} selectedItems={selectedCategories} label="Obszar wsparcia" />
            <DropdownList type="specialization" isChecked={selectedCategories.specialization.length > 0} list={categoriesList["specialization"]} setSelectedItems={setSelectedCategories} selectedItems={selectedCategories} label="Nurt / Specjalizacja" />
            <DropdownList type="gender" isChecked={selectedCategories.gender.length > 0} list={genderList} setSelectedItems={setSelectedCategories} selectedItems={selectedCategories} label="Płeć" />
            <DropdownList type="langue" isChecked={selectedCategories.langue.length > 0} list={categoriesList["langue"]} setSelectedItems={setSelectedCategories} selectedItems={selectedCategories} label="Języki" />
            <DropdownRangesList listWeekDays={weekDays} listRanges={ranges} setSelectedItems={setSelectedCategories} selectedItems={selectedCategories} label="Termin" />

        </div>
    )
}

export { FeaturesMenu }