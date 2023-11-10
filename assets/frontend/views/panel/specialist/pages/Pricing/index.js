import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import "./pricing.scss"
import useApi from "../../../../../lib/api/useApi";
import { ButtonPrimary } from '../../../../../components/ButtonPrimary/ButtonPrimary';
import { ButtonSecondary } from '../../../../../components/ButtonSecondary/ButtonSecondary';
import { LoaderCenter } from '../../../../../components/Loader/LoaderCenter/LoaderCenter';
import { LoaderAbsolute } from '../../../../../components/Loader/LoaderAbsolute/LoaderAbsolute';
import { authGuard } from '../../../../../lib/authGuard';
import message from '../../../../../../admin/components/Toast/message';


const PricingPage = () => {

    const [pricesList, setPricesList] = useState([]);
    const [initData, setInitData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [masterCategories, setMasterCategories] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState({});


    useEffect(() => {
        const [fetch] = useApi();
        fetch('/api-fetch-panel-specialist-prices-init-data', 'post')
            .then((response) => {
                console.log("pp", response.pricesList);
                setPricesList(response.pricesList);
                setMasterCategories(response.masterCategories);

                const selectedPrices = {}
                response.masterCategories.map(item => {
                    selectedPrices[item.masterCategory] = { price: item.selectedPrice, priceItem: item.selectedPriceItem, masterCategory: item.masterCategory };
                })

                setSelectedPrices(selectedPrices);
                setInitData(response);

            })
            .catch((error) => {
                console.log("error", error);

            }).finally(() => {
                // setIsSending(false);
                // setIsInitDataLoaded(true);
            });
    }, [])

    const handleChange = ({ masterCategory, price }) => {

        const newList = { ...selectedPrices };
        newList[masterCategory].price = price;
        setSelectedPrices(newList);

    }

    const handleSave = () => {
        setLoading(true);
        console.log("yyy", JSON.stringify({ ...selectedPrices }));
        const [fetch] = useApi();
        fetch('/api-fetch-panel-specialist-save-prices', { data: JSON.stringify({ ...selectedPrices }) }, 'post')
            .then((response) => {
                // setPricesList(response.pricesList);
                console.log("responsePrices", response);
                message.success("Zapisano pomyślnie.");
            })
            .catch((error) => {
                authGuard(error);
                console.log("error", error);
                message.success("Coś poszło nie tak. Spróbuj pomyślnie");
            }).finally(() => {
                // setIsSending(false);
                setLoading(false);
            });
    }


    const handleReset = () => {
        const selectedPrices = {}
        initData.masterCategories.map(item => {
            selectedPrices[item.masterCategory] = { price: item.selectedPrice, priceItem: item.selectedPriceItem, masterCategory: item.masterCategory };
        })
        setSelectedPrices(selectedPrices);
    }

    if (!initData) {
        return <LoaderCenter />;
    }


    return (
        <div className="pricing--components">
            <h2 className='main--title'>Cennik wizyty</h2>

            {isLoading && <LoaderAbsolute />}

            {Object.keys(selectedPrices).length > 0 && masterCategories.map((item, index) => (
                <Fragment>
                    <h3 className='main--subtitle'>{item.name}</h3>
                    {console.log(selectedPrices[item.masterCategory], pricesList)}
                    <FormControl fullWidth>
                        <Select
                            labelId="month-label"
                            id="month-select"
                            fullWidth
                            size='small'
                            sx={{ mt: 3 }}
                            value={selectedPrices[item.masterCategory].price}
                            onChange={(e) => handleChange({ masterCategory: item.masterCategory, price: e.target.value })}
                        >
                            {pricesList.map(item => (
                                <MenuItem value={item.id}>{`${item.valueForPatient} zł (dla ciebie ${item.valueForDoctor} zł / wizytę)`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {masterCategories.length - 1 !== index && <div style={{ margin: "20px 0" }} className='main--line'></div>}


                </Fragment>
            ))}



            {/* <h3 className='main--subtitle'>Interwencja kryzysowa</h3>
                <FormControl fullWidth>
                    <Select
                        labelId="month-label"
                        id="month-select"
                        fullWidth
                        size='small'
                        sx={{ mt: 3 }}
                        value={intervention}
                        onChange={(e) => handleChange(e.target.value, "interwencja-kryzysowa")}
                    // MenuProps={{
                    //     disableScrollLock: true,
                    //   }}
                    >
                        {pricesList["interwencja-kryzysowa"].map(item => (
                            <MenuItem value={item.id}>{`${item.valueForPatient} zł (dla ciebie ${item.valueForDoctor} zł / wizytę)`}</MenuItem>
                        ))}

                    </Select>
                </FormControl> */}


            <div style={{ display: "flex", marginTop: 30 }}>
                <ButtonPrimary onClick={handleSave} style={{ marginRight: 20 }} text="Zapisz" />
                <ButtonSecondary onClick={handleReset} text="Odrzuć zmiany" />
            </div>


        </div >
    )
}

export { PricingPage }