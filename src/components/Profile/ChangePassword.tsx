import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useChangePasswordMutation, useFetchUserQuery} from "../../features/api/accountApi.ts";
import {createToken} from "../../utils/constants.ts";
import {setToken} from "../../features/slices/tokenSlice.ts";

interface Props {
    close: () => void;
}

const ChangePassword = ({close}: Props) => {
    const oldPasswordLabel = 'Old password:';
    const confirmPasswordLabel = 'Confirm password:';
    // const alertOldPassword = 'Old password is incorrect ';
    // const alertConfirmPassword = 'The new and confirmed password must be the same ';

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const {login} = useAppSelector(state => state.user);

    // const [oldPasswordText, setOldPasswordText] = useState(oldPasswordLabel);
    // const [confirmPasswordText, setConfirmPasswordText] = useState(confirmPasswordLabel);

    const dispatch = useAppDispatch();
    const [changePassword, {isSuccess}] = useChangePasswordMutation();
    const token = useAppSelector(state => state.token);
    const {data} = useFetchUserQuery(token);

    const handleClickClear = () => {
        setNewPassword('');
        setConfirmPassword('');
        setOldPassword('');
        // setOldPasswordText(oldPasswordLabel);
        // setConfirmPasswordText(confirmPasswordLabel);
    }

    if (isSuccess) {
        dispatch(setToken(createToken(data!.login, newPassword)));
    }

    const handleClickSave = () => {
        // const inputOldPasswordToken = createToken(login, oldPassword);
        // let textLabel;
        //
        // textLabel = inputOldPasswordToken !== token ? alertOldPassword : oldPasswordLabel;
        // setOldPasswordText(textLabel);
        //
        // textLabel = confirmPassword !== newPassword ? alertConfirmPassword : confirmPasswordLabel;
        // setConfirmPasswordText(textLabel);

        if (confirmPassword === newPassword) {
            changePassword([newPassword, createToken(data!.login, oldPassword)]);
        } else {
            alert('');
        }

        // if (inputOldPasswordToken === token && confirmPassword === newPassword) {
        //     dispatch(changePassword(newPassword));
        //     close();
        // }
    }

    return (
        <>
            <label>{oldPasswordLabel}
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
            <label>{confirmPasswordLabel}
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