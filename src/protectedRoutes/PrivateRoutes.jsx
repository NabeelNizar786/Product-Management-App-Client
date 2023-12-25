import { useState, useEffect } from "react";
import { Navigate, Outlet, } from "react-router-dom";
import { isUserAuth } from "../services/userApi";

import React from 'react'

const PrivateRoutes = ({role, route}) => {

    const [verify, setVerify] = useState(null);

    useEffect(()=> {
        if(role === 'user') {
            isUserAuth()
            .then((res) => {
                if(res.data.success) {
                    setVerify(res.data.success)
                }
            })
            .catch((error) => {
                setVerify(false)
                localStorage.removeItem('userJwt')
                console.log(error);
            })
        }
    },[])

    if (verify === null) return;

  return verify ? <Outlet/> : <Navigate to={route}/>
}

export default PrivateRoutes