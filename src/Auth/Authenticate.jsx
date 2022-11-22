import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';

import endpointURL from "./Utils/endpointURL"
import Loader from '../components/Loader';
import { regex } from '../Auth/Utils/regex'
import { setUserData } from '../Redux/Slice/index';


export default function Authenticate () {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    if (isLoading === true) return (
        <Loader />
    )

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const login = async(e) => {
        e.preventDefault(e)
        if (!regex(credentials.email, "email")) return setError('Email inválido')

        setIsLoading(true)

        try {
            const { data } = await axios.post(`${endpointURL}/auth/login`, credentials)

            // guardo credenciales en localStorage
            localStorage.setItem("logCredentials", JSON.stringify(data.msg))

            // guardo credenciales en reducer
            dispatch(setUserData(data.msg))

            // limpio estados locales
            setIsLoading(false)
            setCredentials({email: '', password: ''})
            setError('')

            navigate('/')
        } catch (error) {
            setIsLoading(false)
            setCredentials({
                ...credentials,
                password: ''
            })
            setError(error.response ? error.response.data.msg : 'unexpected error')  
        }
    }

    return (
        <div className="mt-24 w:full flex justify-center">
            <div className="flex flex-col lg:w-95 p-9 pt-9 m-3 justify-center rounded-xl shadow-xl bg-white ">
                <h1 className="text-4xl font-semibold text-blue-400">Dashboard Bue!</h1>
                <h2 className="text-2xl font-extralight mb-10 text-gray-400">Ingresa a tu cuenta</h2>
                <form className="flex flex-col items-center gap-4" action="" onSubmit={(e) => login(e)}>
                    <input required 
                        className="pt-2 pb-2 w-80 text-center outline-none rounded-md text-gray-400 bg-gray-100"
                        placeholder="ejemplo@mercadobue.com.ar" 
                        type="email" 
                        name="email" 
                        value={credentials.email} 
                        onChange={handleChange} 
                        spellCheck="false" 
                    />
                    <input required 
                        className="pt-2 pb-2 w-80 text-center outline-none rounded-md text-gray-400 bg-gray-100"
                        placeholder="******" 
                        type="password" 
                        name="password" 
                        value={credentials.password} 
                        onChange={handleChange} 
                    />
                    <div id="error" className="text-sm text-red-500">{error}</div>
                    <button className="w-40 h-14 mb-2 text-lg text-shadow rounded-md text-white drop-shadow-md bg-blue-400" type="submit">
                        INGRESAR
                    </button>
                </form>
                <div className="flex flex-col">
                    <Link className="m-auto text-sm text-gray-400 hover:text-blue-400" to="/auth/confirm/email/resetPass">
                        ¿Olvidaste la contraseña?
                    </Link>
                    <Link className="m-auto text-sm text-gray-400 hover:text-blue-400" to="/auth/confirm/email/register">
                        Registrarse
                    </Link>
                </div>
            </div>
        </div>
    );
};