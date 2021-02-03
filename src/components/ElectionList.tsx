import React, { useEffect, useContext, useState} from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import { List } from 'rsuite'
import { getElectionList, Election} from '../utils/api/ElectionManagement'
import { getAccessToken} from '../utils/API';
import ElectionInfo from './ElectionInfo';

export default function ElectionList() {
    const accessToken = getAccessToken();
    const[isLoading, setLoading] = useState(true);
    const[electionList, setElectionList] = useState<Array<Election>>([]);
    
    useEffect(()=>{
        accessToken ? 
        getElectionList(accessToken.token)
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
                        <Link to={`/election/${election.id}`}>{election.id}</Link>
                    </List.Item>
                ))}
            </List>
        </div>
    )
}
