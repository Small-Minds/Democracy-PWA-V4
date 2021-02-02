import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAccessToken } from '../utils/API';
import { Election, getElection } from '../utils/api/ElectionManagement';
export default function ElectionInfo() {
    let{ id } = useParams<any>();
    const[isLoading, setLoading] = useState(true);
    const[election, setElection] = useState<Election>()
    const accessToken = getAccessToken();

    useEffect(()=>{
        accessToken ?
        getElection(accessToken.token, id)
        .then((res)=>{
            console.log(res)
            setElection(res.data);
            setLoading(false);
        }) : console.log("Please Login2")
    },[id])

    //waiting for the response from getEletctionList 
    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div>
            <h3>Election Id: {election?.id}</h3>
            <h3>Election Creatation Date: {election?.created}</h3>
        </div>
    )
}
