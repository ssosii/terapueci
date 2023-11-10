import { h, render } from 'preact';
import { CheckboxField } from '../../form/CheckboxField/CheckboxField';


const ConfirmFields = ({ values, errors, handleChange, touched, isPrzelewy24 = false }) => {
    return (
        <div>
            <CheckboxField field="confirmPolicy" value={values.confirmPolicy} error={Boolean(touched.confirmPolicy && errors.confirmPolicy)} handleChange={handleChange} style={{ marginTop: 20 }}>
                Zgadzam się na przetwarzanie danych wrażliwych (m.in. zdrowia) w celu usprawnienia procesu bezpłatnej konsultacji, dobrania terapeuty, a także realizacji umowy zgodnie z <a className='linkBright' href="/polityka-prywatnosci" target="_blank">Polityką Prywatności.</a>*
            </CheckboxField>

            <CheckboxField field="confirmStatute" value={values.confirmStatute} error={Boolean(touched.confirmStatute && errors.confirmStatute)} handleChange={handleChange} style={{ marginTop: 20 }}>
                Oświadczam, że zapoznałem się z treścią <a className='linkBright' href="/regulamin" target="_blank">Regulaminu</a> i zgadzam się z jego postanowieniami.*
            </CheckboxField>
            {isPrzelewy24 && (
                <CheckboxField field="confirmPrzelewy24" value={values.confirmPrzelewy24} error={Boolean(touched.confirmPrzelewy24 && errors.confirmPrzelewy24)} handleChange={handleChange} style={{ marginTop: 20 }}>
                    Oświadczam, że zapoznałem się z treścią <a className='linkBright' href="https://www.przelewy24.pl/regulamin" target="_blank">Regulaminu</a> serwisu Przelewu24 i zgadzam się z jego postanowieniami.*
                </CheckboxField>
            )}


            <CheckboxField field="confirmMarketing" value={values.confirmMarketing} error={Boolean(touched.confirmMarketing && errors.confirmMarketing)} handleChange={handleChange} style={{ marginTop: 20 }}>
                Zgadzam się na otrzymywanie informacji o bezpłatnych treściach oraz ofertach na podany przeze mnie e-mail/numer telefonu zgodnie z <a className='linkBright' href="https://www.w3schools.com" target="_blank">Polityką Prywatności.</a>
            </CheckboxField>
        </div>
    )
}

export { ConfirmFields }