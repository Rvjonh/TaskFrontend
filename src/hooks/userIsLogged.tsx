import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { RootState } from "../store/store"

export function useIsLogged(onLogged?: string, onNotLogged?: string) {
    /* Hook check when user has a token stored in the browser meaning it's active */
    const navigate = useNavigate();
    const { identificador } = useSelector((state: RootState) => state.login);
    const [logged, setLogged] = useState<boolean>(false);


    useEffect(() => {
        if (identificador != "") {
            setLogged(true)
            if (onLogged) {
                navigate(onLogged)
            }
        } else {
            setLogged(false);
            if (onNotLogged) {
                navigate(onNotLogged)
            }
        }
    }, [identificador])

    return { active: logged, token: identificador }
}