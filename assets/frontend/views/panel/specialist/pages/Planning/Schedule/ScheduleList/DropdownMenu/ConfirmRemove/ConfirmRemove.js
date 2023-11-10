import { Fragment, h, render } from 'preact';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmRemove  = ({handleClose,removeOrder}) => {

    const confirmRemove = () =>{
        removeOrder();
        handleClose();
    }

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}

      >
        <DialogTitle id="alert-dialog-title">
          {"Jesteś pewny, że chcesz odwołać to spotkanie?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose}>Wróć</Button>
          <Button onClick={confirmRemove} autoFocus>
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export { ConfirmRemove }