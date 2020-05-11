import React, {useContext, useEffect} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";

const REACT_APP_GOOGLE_CLIENT_ID = '304250547620-6qbjf3jq6lvs0bea3fc3mr23p2utmh98.apps.googleusercontent.com';

export const AuthGoogle = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();

    useEffect(() => {
        const _onInit = auth2 => {
            console.log('init OK', auth2)
        };
        const _onError = err => {
            console.log('error', err)
        };

        window.gapi.load('auth2', function () {
            window.gapi.auth2
                .init({ // не забудьте указать ваш ключ в .env
                    client_id: REACT_APP_GOOGLE_CLIENT_ID,
                })
                .then(_onInit, _onError)
        })
    }, []);

    const signIn = () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn().then(googleUser => {
            try {
                const basicProfile = googleUser.getBasicProfile();
                /*const idToken = googleUser.getAuthResponse().id_token;*/

                console.log('Email: ' + basicProfile.getEmail());
                console.log('ID: ' + basicProfile.getId());

                const profile = {
                    email: basicProfile.getEmail(),
                    id: basicProfile.getId()
                };

               request('/api/auth/google-login', 'POST', profile).then((data => {
                   message(data.message);
                   auth.login(data.token, data.userId)
               }));
            } catch (e) {
            }

            // метод возвращает объект пользователя
            // где есть все необходимые нам поля
        })
    };

    /*const signOut = () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.')
        })
    };*/

    return (
        <div>
            <header>
                <button onClick={signIn}>Войти через Google</button>
                {/*<button onClick={this.signOut}>Log out</button>*/}
            </header>
        </div>
    )
};

export default AuthGoogle