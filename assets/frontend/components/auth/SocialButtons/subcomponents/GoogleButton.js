import { h, Fragment } from 'preact';
import axios from 'axios';
// import { GoogleLogin } from 'react-google-login';
import useApi from '../../../../lib/api/useApi';
// import googleIcon from "./../../../../images/icons/auth-google.svg";

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';

const GoogleButton = () => {

    const loginAction = (tokenResponse) => {

        console.log("token1", tokenResponse, tokenResponse.access_token);
        const { sub: googleId, email, given_name: firstName, family_name: secondName, } = jwt_decode(tokenResponse.access_token);

        console.log("token", tokenResponse);
        const [fetch] = useApi();
        const data = { email, firstName, secondName, googleId };
        console.log("jsw", email, firstName, secondName, googleId,);

        fetch('/login-google', data, 'post')
            .then((response) => {
                if (response.url) {
                    location.href = response.url;
                }
            })
            .catch((error) => {

                // console.log(error);
            });
    }

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            console.log(tokenResponse);
            // fetching userinfo can be done on the client or the server
            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                })
                .then(res => res.data);




            const { sub: googleId, email, given_name: firstName, family_name: secondName, } = userInfo;
            const username = firstName && firstName !== undefined && firstName !== null ? firstName : "" + secondName && secondName !== undefined && secondName !== null ? secondName : "";
            const data = { email, username, googleId };
            console.log("jsw", data);



            const [fetch] = useApi();

            fetch('/login-google', data, 'post')
                .then((response) => {
                    if (response.url) {
                        location.href = response.url;
                    }
                })
                .catch((error) => {

                    console.log(error);
                });
        }
        ,
        onError: () => alert('Coś poszło nie tak. Spróbuj ponownie, a jeśli problem będzie się powtarzał wybierz logowanie tradycyjne.')
    });


    // const onSuccess = ({ profileObj }) => {
    //     console.log('profile',profileObj);
    //     const { googleId , givenName:firstName, familyName:secondName, email } = profileObj;
    //     const data = { email, firstName, secondName, googleId };
    //     const [fetch] = useApi();

    //     fetch('/login-google', data, 'post')
    //         .then((response) => {
    //             if (response.url) {
    //                 location.href = response.url;
    //             }
    //         })
    //         .catch((error) => {

    //             // console.log(error);
    //         });

    // };

    // const onFailure = (res) => {
    //     console.log('Login failed: res:', res);
    // };



    return (



        <div onClick={() => login()} className="button-social">
            <svg style="width:22px;" viewBox="0 0 48 48">
                <title>Google Logo</title>
                <clipPath id="g">
                    <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                </clipPath>
                <g class="colors" clip-path="url(#g)">
                    <path fill="#FBBC05" d="M0 37V11l17 13z" />
                    <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                    <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                    <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                </g>
            </svg>
            <span className='text'>Kontynuj z Google</span>


        </div>



    )

}

export default GoogleButton;




{/* <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    const { sub: googleId, email, given_name: firstName, family_name: secondName, } = jwt_decode(credentialResponse.credential);
       

                    const [fetch] = useApi();
                    const data = { email, firstName, secondName, googleId };
                    console.log("jsw",  email, firstName, secondName, googleId,  );

                    fetch('/login-google', data, 'post')
                        .then((response) => {
                            if (response.url) {
                                location.href = response.url;
                            }
                        })
                        .catch((error) => {

                            // console.log(error);
                        });

                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            /> */}

                    // <GoogleLogin
        //     clientId={clientId}
        //     buttonText="Login"
        //     onSuccess={onSuccess}
        //     onFailure={onFailure}
        //     cookiePolicy={'single_host_origin'}
        //     style={{ marginTop: '100px' }}
        //     isSignedIn={false}
        //     render={renderProps => (
        //         <button class="btn--google" onClick={renderProps.onClick} disabled={renderProps.disabled}>
        //             {/* <img class="icon" src={googleIcon} /> */}
        //             <span class="text">Użyj konta Google</span></button>
        //     )}
        // />