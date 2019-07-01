import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
require('dotenv').config();

const Youtube = () => {
    const [state, setState] = useState('');
    const responseGoogle = response => {
        console.log(response);
        setState(response.accessToken);
    };
    const logout = response => {
        console.log('Successfully logged out');
        setState('');
    };
    return (
        <>
            {state ? (
                <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />
            ) : (
                <GoogleLogin
                    clientId="220374714491-q0vg5oso6jrsjudaq64ksqj4dg02bn75.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    isSignedIn
                    cookiePolicy={'single_host_origin'}
                />
            )}
        </>
    );
};
export default Youtube;
