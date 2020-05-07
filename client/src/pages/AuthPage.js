import React, {useState, useContext, useEffect} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import AuthGoogle from "../components/AuthGoogle";

export const AuthPage = () => {

    const auth = useContext(AuthContext);

    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    /*const googleId = config.get('REACT_APP_GOOGLE_CLIENT_ID');*/

    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);
/*

    useEffect(() => {
        const _onInit = auth2 => {
            console.log('init OK', auth2)
        };
        const _onError = err => {
            console.log('error', err)
        };

        window.gapi.load('auth2', function () {
            window.gapi.auth2
                .init({
                    client_id: googleId,
                })
        }).then(_onInit, _onError)
    }, [googleId]);
*/

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const loginHandler = async () => {
        try {
            console.log('form: ', form);
            const data = await request('/api/auth/login', 'POST', {...form});
            message(data.message);
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    };

    const registerHandler = async () => {
        try {
            console.log('form: ', form);
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {
        }
    };

    /*const loginGoogleHandler = async () => {
        try {
            const auth2 = window.gapi.auth2.getAuthInstance();
            auth2.signIn().then(googleUser => {

                // метод возвращает объект пользователя
                // где есть все необходимые нам поля
                const profile = googleUser.getBasicProfile()
                console.log('ID: ' + profile.getId()) // не посылайте подобную информацию напрямую, на ваш сервер!
                console.log('Full Name: ' + profile.getName())
                console.log('Given Name: ' + profile.getGivenName())
                console.log('Family Name: ' + profile.getFamilyName())
                console.log('Image URL: ' + profile.getImageUrl())
                console.log('Email: ' + profile.getEmail())

                // токен
                const id_token = googleUser.getAuthResponse().id_token
                console.log('ID Token: ' + id_token)
            })
        } catch (e) {
        }
    };*/

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи Ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="yellow-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>

                        </div>
                    </div>

                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}>
                            Войти
                        </button>

                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}>
                            Регистрация
                        </button>

                        {/*<button
                            className="btn yellow darken-4"
                            onClick={loginGoogleHandler}
                            disabled={loading}>
                            Войти через Google
                        </button>
*/}
                    </div>

                    <AuthGoogle/>

                </div>
            </div>
        </div>
    );
};
