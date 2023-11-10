import { h, Fragment } from 'preact';
import GoogleButton from "./subcomponents/GoogleButton";
import FacebookButton from "./subcomponents/FacebookButton";
import { GoogleOAuthProvider } from '@react-oauth/google';

const SocialButtons = () => {

    const clientId =
        '155898771200-af773qpc8p862mdhdjc7h1af26p8a79i.apps.googleusercontent.com';

    return (
        <Fragment>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleButton />
            </GoogleOAuthProvider>

            {/* <FacebookButton /> */}


        </Fragment>
    );
};

export { SocialButtons }