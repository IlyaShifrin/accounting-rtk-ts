import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {changePassword} from "../../features/api/accountApi.ts";
import {createToken} from "../../utils/constants.ts";

interface Props {
    close: () => void;
}

const ChangePassword = ({close}: Props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {login} = useAppSelector(state => state.user);
    const token = useAppSelector(state => state.token);
    const dispatch = useAppDispatch();

    const handleClickClear = () => {
        setNewPassword('');
        setConfirmPassword('');
        setOldPassword('');
    }

    const handleClickSave = () => {
        const inputOldPasswordToken = createToken(login, oldPassword);
        let alertPassword = '';

        if (confirmPassword !== newPassword) {
            alertPassword = 'New password and confirm new password are different';
        }

        if (inputOldPasswordToken !== token) {
            alertPassword = 'Old password is incorrect';
        }

        if (alertPassword) {
            alert(alertPassword);
        } else {
            dispatch(changePassword(newPassword));
        }

        close();
    }

    return (
        <>
            <label>Old password:
                <input
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    type='password'/>
            </label>
            <label>New password:
                <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    type='password'/>
            </label>
            <label>Confirm password:
                <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type='password'/>
            </label>

            <button onClick={handleClickSave}>Save and close</button>
            <button onClick={close}>Close without Save</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default ChangePassword;