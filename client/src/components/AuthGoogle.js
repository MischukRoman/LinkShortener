import React, { Component } from 'react'
const REACT_APP_GOOGLE_CLIENT_ID = '304250547620-6qbjf3jq6lvs0bea3fc3mr23p2utmh98.apps.googleusercontent.com';

class AuthGoogle extends Component {

    componentDidMount() {
        const _onInit = auth2 => {
            console.log('init OK', auth2)
        };
        const _onError = err => {
            console.log('error', err)
        };

        window.gapi.load('auth2', function() {
            window.gapi.auth2
                .init({ // не забудьте указать ваш ключ в .env
                    client_id: REACT_APP_GOOGLE_CLIENT_ID,
                })
                .then(_onInit, _onError)
        })
    }

    signIn = () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn().then(googleUser => {

            // метод возвращает объект пользователя
            // где есть все необходимые нам поля
            const profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId());
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());

            // токен
            const id_token = googleUser.getAuthResponse().id_token;
            console.log('ID Token: ' + id_token)
        })
    };
    signOut = () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
            console.log('User signed out.')
        })
    };
    render() {
        return (
            <div>
                <header >
                    <button onClick={this.signIn}>Войти через Google</button>
                    {/*<button onClick={this.signOut}>Log out</button>*/}
                </header>
            </div>
        )
    }
}

export default AuthGoogle