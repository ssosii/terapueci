import "./SingleImageUploader.scss";
import { Fragment, h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import useApi from "./../../lib/api/useApi";

// const Input = styled("input")({
//     display: "none"
// });

const SingleImageUploader = ({ imageUrlDefault, type, userID }) => {
    const [imageUrl, setImageUrl] = useState(imageUrlDefault);
    const [isLoading, setIsLoading] = useState(false);
    const fileRef = useRef(null);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    let unique = (Math.random() + 1).toString(36).substring(7);
    console.log("fff", imageUrlDefault, type, userID);
    useEffect(() => {
        setImageUrl(imageUrlDefault);
    }, [imageUrlDefault])

    const onChangeFile = async (e) => {
        setIsLoading(true);
        const files = e.target.files;
        const file = files[0];

        if (file) {
            console.log('images', file);
            if (type === 'doctor-avatar') {
                const [fetch] = useApi();
                fetch(`/api-doctor-upload-avatar/${userID}`, { file, fileToRemove: imageUrlDefault, type, userID }, 'post')
                    .then((response) => {
                        console.log('response', response);
                        const { fileUrl } = response;
                        setImageUrl(fileUrl);
                    })
                    .catch((error) => {
                        // setType('fail');
                        // setIsOpen(true);
                        console.log('error', error);
                    });
            }


        }

        // if (e.target.files.length) {

        //     const file = files[0];
        //     const { imageUrl: imageUrlResponse, temponaryImageID } = await fileService.uploadTemponaryImage({ file });
        //     if (imageUrlResponse && temponaryImageID) {
        //         setImageUrl(imageUrlResponse);
        //         setTemponaryImageID(temponaryImageID);
        //     }
        //     fileRef.current.value = "";
        // }

        setIsLoading(false);

    }
    console.log('imageUrlx', imageUrl);
    return (
        <Fragment>
            {imageUrl && (
                <img style={{ maxWidth: "200px" }} src={imageUrl} />
            )}
            <label style={{display:"block"}} htmlFor={`contained-button-file-user-admin${unique}`}>
                <div class="upload-btn-wrapper">
                    <input
                        accept="image/*"
                        id={`contained-button-file-user-admin${unique}`}
                        multiple={false}
                        type="file"
                        class="btn"
                        onChange={(e) => onChangeFile(e)}
                        style={{ display: "none" }}
                    />
                    <div class="btn">Zmień zdjęcie</div>
                </div>
            </label>
        </Fragment>
    )
}
export default SingleImageUploader;

