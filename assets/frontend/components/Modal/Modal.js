import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';


//material ui
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

const Modal = ({ isOpen, handleClose, isLoading, setIsLoading, children, size = "md", title, isCloseIcon = true, isSmallSize = false,style={} }) => {

    const maxWidthStyle = isSmallSize ? { maxWidth: "340px" } : { maxWidth : "auto" }
console.log("max",maxWidthStyle,style);

    return (
        <Dialog
            fullWidth
            onClose={handleClose}
            open={isOpen}
            maxWidth={size}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        borderRadius: 4,
                        ...maxWidthStyle,
                        ...style
                    },
                }
            }}
        >
            <Fragment>
                {isCloseIcon && (
                    <IconButton
                        onClick={handleClose}
                        style={{ position: 'absolute', top: 15, right: 15, zIndex: 1 }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}


                {/* {isLoading && <Loader />} */}

                {title && (
                    <DialogTitle
                        sx={{
                            textAlign: 'center',
                            fontSize: 25,
                            fontWeight: 600,
                            mb: 1,
                        }}
                    >
                        {title}
                    </DialogTitle>
                )}
                <DialogContent>{children}</DialogContent>
            </Fragment>
        </Dialog>
    );
};

export { Modal };