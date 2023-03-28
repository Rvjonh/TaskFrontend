import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { RootState } from "../store/store"

export function useIsLogged() {
    /* Hook check when user has a token stored in the browser meaning it's active */
    const { identificador } = useSelector((state: RootState) => state.login);
    const [logged, setLogged] = useState<boolean>(false);

    useEffect(() => {
        if (identificador != "") {
            setLogged(true)
        } else {
            setLogged(false)
        }
    }, [identificador])

    return { active: logged, token: identificador }
}