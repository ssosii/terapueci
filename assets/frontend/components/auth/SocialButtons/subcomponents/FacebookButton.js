import { h, Fragment } from 'preact';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import useApi from '../../../../lib/api/useApi';
import "./socialButtons.scss";

const FacebookButton = () => {


    const responseFacebook = (profileObj) => {
        console.log('profile', profileObj);

        const { id: facebookId, name, email } = profileObj;
        const data = { facebookId, name, email };
        const [fetch] = useApi();
        if (facebookId && email) {
            fetch('/login-facebook', data, 'post')
                .then((response) => {
                    if (response.url) {
                        location.href = response.url;
                    }
                })
                .catch((error) => {

                    // console.log('facebookError',error);
                });
        } else {
            alert('Coś poszło nie tak lub Twoje konto nie posiada adresu e-mail. Spróbuj ponownie lub skorzystaj z tradycyjnej rejestracji.')
        }

    };

    return (
        // <div className="button-social">
        //     <svg  xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
        //         <path d="M9.11539 2.78222H6.65483C6.36363 2.78222 6.03969 3.17689 6.03969 3.70489V5.53778H9.11539V8.15111H6.03797V16H3.13459V8.15111H0.5V5.53778H3.13459V4C3.13459 1.79378 4.61815 0 6.65483 0H9.11539V2.78222Z" fill="#3279EA" />
        //     </svg> 
        //     <span className='text'>Kontynuj z Facebook</span>


        // </div>

        <Fragment>
            <FacebookLogin
                // appId="349019853622801"
                appId="875326023688241"
                
                autoLoad={false}
                fields="name,email,picture"
                // onClick={componentClicked}
                callback={responseFacebook}
                render={renderProps => (
                    <button class="btn--facebook" onClick={renderProps.onClick}>
                        {/* <img class="icon" src={facebookIcon} /> */}
                    <span class="text">Użyj konta Facebook</span></button>
                )}
            />
        </Fragment>
    )

}

export default FacebookButton;