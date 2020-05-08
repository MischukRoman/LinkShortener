import {useState, useCallback, useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom';
import {useMessage} from "./message.hook";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = useContext(AuthContext);
    const history = useHistory();
    const message = useMessage();

    const request = useCallback(async (url, method = 'GET', body = null, headers ={}) => {
        setLoading(true);
        try {
            if(body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }
            setLoading(false);

            return data
        } catch (e) {
            setLoading(false);
            setError(e.message);
            message(e.message);

            if(e.message === "Unauthorized") {
                auth.logout();
                history.push('/')
            }
            throw e
        }
    }, [auth, history, message]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return { loading, request, error, clearError }
};