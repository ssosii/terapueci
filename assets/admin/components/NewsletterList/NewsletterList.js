import { h, render, Fragment } from 'preact';
import { useState ,useRef } from 'preact/hooks';
import { useEffect } from 'react';
import useApi from '../../../frontend/lib/api/useApi';
import { LoaderCenter } from "./../../../frontend/components/Loader/LoaderCenter/LoaderCenter";
import Checkbox from '@mui/material/Checkbox';
import { getOriginUrl } from '../../lib/redirect';
import { ButtonPrimary } from "./../../../frontend/components/ButtonPrimary/ButtonPrimary";

const NewsletterList = () => {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isSelectedAll, setIsSelectedAll] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {

        const [fetch] = useApi();
        fetch(`/admin/api-fetch-newsletter`, 'get')
            .then((response) => {

                setList(response.list);
                // const { fileUrl } = response;
                // setImageUrl(fileUrl);
            })
            .catch((error) => {
                // setType('fail');
                // setIsOpen(true);

                console.log('error', error);
            }).finally(() => {
                setIsLoaded(true);
            });
    }, []);

    const handleChange = (id) => {
        const newSelected = [...selected];
        if (newSelected.includes(id)) {
            const filtred = selected.filter(item => item !== id);
            setSelected(filtred);
        } else {
            setSelected([...selected, id]);
        }
    }

    const handleSelectedAll = () => {
        const newValue = !isSelectedAll;
        setIsSelectedAll(newValue);
        console.log("newValue", newValue);
        if (newValue) {
            const newList = [...list].map(item => item.id);
            setSelected(newList);
        } else {
            setSelected([]);
        }

    }
    console.log("selected", selected);

    const downloadFile = () => {
        if (selected.length === 0) {
            alert("Musisz wybrać przynajmnej jednego użytkownika");
        } else {
            const [fetch] = useApi();
            fetch(`/admin/generate-file`, { list: JSON.stringify(selected) }, 'post')
                .then((response) => {
                    console.log("respo", response);
                    inputRef?.current.click()
                    // alert(getOriginUrl() + "/newsletter.csv");
                    // setList(response.list);
                    // const { fileUrl } = response;
                    // setImageUrl(fileUrl);
                })
                .catch((error) => {
                    // setType('fail');
                    // setIsOpen(true);

                    console.log('error', error);
                }).finally(() => {
                    setIsLoaded(true);
                });
        }
    }

    if (!isLoaded) {
        return <LoaderCenter />
    }






    return (
        <div>
            <a ref={inputRef} style={{opacity:0}} href={getOriginUrl() + "/newsletter.csv"} download>Click to download</a>
            <div style={{ display: "flex", justifyContent: "end", marginBottom: 20 }}><ButtonPrimary onClick={downloadFile} text="Pobierz plik" /></div>

            <table>
                <tr>
                    <th>
                        <Checkbox
                            belStyle={{ color: 'white' }}
                            iconStyle={{ fill: 'white' }}
                            inputStyle={{ color: 'white' }}
                            style={{ color: 'white' }}
                            onChange={handleSelectedAll} checked={isSelectedAll} />
                    </th>
                    <th>Id</th>
                    <th>Imię i nazwisko</th>
                    <th>Email</th>
                </tr>
                {list.map(item => (
                    <tr>
                        <td><Checkbox onChange={() => handleChange(item.id)} checked={Boolean(selected.includes(item.id))} /></td>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>
                            {item.email}
                        </td>

                    </tr>
                ))}



            </table>


        </div>
    )
}

export { NewsletterList }


render(<NewsletterList />, document.querySelector('#newsletterList'));
