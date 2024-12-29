import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {useRegisterUserMutation} from "../../features/api/accountApi.ts";
import {setToken} from "../../features/slices/tokenSlice.ts";
import {createToken} from "../../utils/constants.ts";

const Register = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const dispatch = useAppDispatch();
    const [registerUser, {isSuccess}] = useRegisterUserMutation();

    if (isSuccess) {
        dispatch(setToken(createToken(login, password)));
    }

    const handleClickRegister = () => {
        registerUser({login, password, firstName, lastName});
    }

    const handleClickClear = () => {
        setLogin('');
        setPassword('');
        setFirstName('');
        setLastName('');
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
            <label>First Name:
                <input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                />
            </label>
            <label>Last Name:
                <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                />
            </label>
            <button onClick={handleClickRegister}>Register</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default Register;