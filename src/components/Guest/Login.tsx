import {useState} from "react";
import {useLazyFetchUserQuery} from "../../features/api/accountApi.ts";
import {createToken} from "../../utils/constants.ts";
import {useDispatch} from "react-redux";
import {setToken} from "../../features/slices/tokenSlice.ts";

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [fetchUser] = useLazyFetchUserQuery();

    const handleClickLogin = async () => {
        const token = createToken(login, password);
        const result = await fetchUser(token);
        if (result.isSuccess) {
            dispatch(setToken(token));
        }
    }

    const handleClickClear = () => {
        setLogin('');
        setPassword('');
    }

    return (
        <>
            <label>Login:
                <input
                    type="text"
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                />
            </label>
            <label>Password:
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <button onClick={handleClickLogin}>Sign in</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default Login;