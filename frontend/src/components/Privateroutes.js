import React, { useEffect,useState } from "react";

import { Outlet, Navigate } from 'react-router-dom'


const PrivateRoutes = (props) => {
const JWT = localStorage.getItem("token")

      let auth 
if(JWT == null){
    auth = {'token':false}
}
else{
    auth = {'token':true}
}

    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes