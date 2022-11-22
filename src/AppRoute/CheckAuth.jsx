import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../Redux/Slice/index"


export default function AuthRoute() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const reducerCredentials = useSelector(state => state.USER.userData)

    useEffect(() => {
        // checkeo si ya está logueado
        const signedUp = JSON.parse(localStorage.getItem("logCredentials"))
if (signedUp !== null) {
            if (reducerCredentials === '') {
                dispatch(setUserData(signedUp)) // en el caso de que tenga persistencia en localStorage pero se haya borrado en el reducer
            }
        } else {
            navigate("/auth/login")
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
return (
    <>
        <Outlet />
    </>
  )
}