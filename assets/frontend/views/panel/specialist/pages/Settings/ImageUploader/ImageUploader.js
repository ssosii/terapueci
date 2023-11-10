import "./singleImageUploader.scss";
import { Fragment, h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useApi from "./../../../../../../lib/api/useApi";
import { authGuard } from "../../../../../../lib/authGuard";


const Input = styled("input")({
    display: "none"
});


const array = [
    
]

const ImageUploader = ({ imageUrlDefault, type, userID }) => {
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
        const formData = new FormData()
        formData.append("file", file);
        formData.append("fileToRemove",imageUrlDefault);
        if (file) {
            console.log("run");
            const [fetch] = useApi();
            fetch(`/api-doctor-upload-avatar/${userID}`, { file, fileToRemove: imageUrlDefault, userID }, 'post')
                .then((response) => {
              
                    const { fileUrl } = response;
                    setImageUrl(fileUrl);
                })
                .catch((error) => {
                    // setType('fail');
                    // setIsOpen(true);
                    authGuard(error);
                    
                    console.log('error', error);
                });

        }

        setIsLoading(false);

    }

    return (
        <div className="image--uploader">
            {imageUrl && (
                <div className="image-wrapper">
                    <img src={imageUrl} />
                </div>

            )}
            <label htmlFor={`contained-button-file-user-admin${unique}`}>
                <Box sx={{ mt: 1 ,display:"inline" }}>
                    <Input
                        accept="image/*"
                        id={`contained-button-file-user-admin${unique}`}
                        multiple={false}
                        type="file"
                        onChange={(e) => onChangeFile(e)}
                    />
                    <div className="button">
                        <CloudUploadIcon size="small" /> <div className="text">Zmień zdjęcie</div>
                    </div>
                    {/* <ButtonFunctional variant="green" icon="upload" text="Zmień zdjęcie" /> */}
                    {/* <Button
                        variant="text"
                        size="small"
                        style={{ marginBottom: 20,color:"#1b1b1f" }}
                        component="span">
                        &nbsp;&nbsp;<CloudUploadIcon /> &nbsp;&nbsp; Zmień zdjęcie
                    </Button> */}
                </Box>
            </label>
        </div>
    )
}
export { ImageUploader }

