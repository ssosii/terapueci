import { h, render, Fragment } from 'preact';

import {

    TextField
} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDebouncedCallback } from 'use-debounce';
import { FormHelperText } from '../../../../../components/form/FormHelperText/FormHelperText';

const PromoCodeField = ({ isPromoCode, setIsPromoCode, value, handleChange, setFieldValue, isPromoCodeChecking, promoCodeId, promoCodeStatus }) => {


    const debounced = useDebouncedCallback(
        (value) => {
            setFieldValue("promoCode", value);
        },
        2000
    );

    return (
        <div style={{ marginTop: 10 }}>
            <FormControlLabel control={<Checkbox checked={isPromoCode} onChange={(e) => setIsPromoCode(e.target.checked)} />} label="Posiadam kod promocyjny" />
            {isPromoCode && (
                <Fragment>
                    {/* {isPromoCodeChecking && <div>Trwa sprawdzanie kodu...</div>} */}

                    <TextField
                        fullWidth
                        name="promoCode"
                        label="Kod promocyjny"
                        sx={{ mt: 1 }}
                        size="medium"
                        error={Boolean(!isPromoCodeChecking && promoCodeStatus === "error")}
                        value={value}
                        // onChange={(e) => debounced(e.target.value)}
                        onChange={handleChange}
                        inputProps={{ maxLength: 255 }}
                    />
                    <div style={{ minHeight: 22, width: "100%", marginTop: 3 }}>
                        {promoCodeStatus === "error" && (
                            <FormHelperText style={{ marginTop: 3 }} error>
                                Twój kod jest wykorzystany lub stracił ważność
                            </FormHelperText>
                        )}
                        {(promoCodeStatus === "success" || promoCodeId) && (
                            <FormHelperText t style={{ marginTop: 3 }} error={false}>
                                Twój kod został dodany prawidłowo.
                            </FormHelperText>
                        )}
                    </div>

                </Fragment>
            )}


        </div>
    )
}

export { PromoCodeField }