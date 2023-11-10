import { Fragment, h, render } from 'preact';
import Alert from '@mui/material/Alert';

const PhotoInfo = () => {
  return (
    <Alert variant="outlined" sx={{mt:2}} severity="warning">Ze względu na specyfikę owalnych zdjęć wyświetlanych w aplikacji najlepiej skalować się będą zdjęcia o kształtach zbliżonych do kwadratu.</Alert>
  )
}

export {PhotoInfo }