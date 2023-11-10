import "./singleImageUploader.scss";
import { Fragment, h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useApi from "./../../lib/api/useApi";

const Input = styled("input")({
    display: "none"
});

const SingleImageUploader = ({ imageUrlDefault, type, userID }) => {
    const [imageUrl, setImageUrl] = useState(imageUrlDefault);
    const [isLoading, setIsLoading] = useState(false);
    const fileRef = useRef(null);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    let unique = (Math.random() + 1).toString(36).substring(7);

    useEffect(() => {
        setImageUrl(imageUrlDefault);
    }, [imageUrlDefault])

    const onChangeFile = async (e) => {
        setIsLoading(true);
        const files = e.target.files;
        const file = files[0];

        if (file) {
            console.log('images', file);
            const [fetch] = useApi();
            fetch(`${userID ? `/api-user-upload-avatar/${userID}` : "/api-upload-file"}`, { file, fileToRemove: imageUrlDefault, type, userID }, 'post')
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
            <label htmlFor={`contained-button-file-user-admin${unique}`}>
                <Box>
                    <Input
                        // accept="image/*"
                        id={`contained-button-file-user-admin${unique}`}
                        multiple={false}
                        type="file"
                        onChange={(e) => onChangeFile(e)}
                    />
                    <Button
                        variant="outlined"
                        style={{ marginBottom: 20 }}
                        component="span">
                        &nbsp;&nbsp;<CloudUploadIcon /> &nbsp;&nbsp;{fileName}
                    </Button>
                </Box>
            </label>
        </Fragment>
    )
}
export default SingleImageUploader;

