import React, { useEffect, useContext, useState} from 'react'
import { Credentials } from '../utils/Authentication';
import { Link } from 'react-router-dom';
import { List } from 'rsuite'
import { getElectionList, Election} from '../utils/api/ElectionManagement'

export default function ElectionList() {
    const ctx = useContext(Credentials);
    const accessToken = ctx ? (ctx.credentials.authenticated ? ctx.credentials.token:''): '';
    const[isLoading, setLoading] = useState(true);
    const[electionList, setElectionList] = useState<Array<Election>>([]);
    
    useEffect(()=>{
        accessToken ? 
        getElectionList(accessToken)
        .then((res)=>{
            setElectionList(res.data);
            setLoading(false);
        }) : console.log('Please Login');
    }, [])

    //waiting for the response from getEletctionList 
    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div>
            <List>
            {electionList.map((election, index) => (
                    <List.Item key={index} index={index}>
                        {election.id}
                    </List.Item>
                ))}
            </List>
        </div>
    )
}
