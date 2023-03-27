import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function Account() {
    const userLogged = useSelector((state: RootState) => state.login);

    return (
        <div>
            <p>Account: {userLogged.correo}</p>
        </div>
    )
}