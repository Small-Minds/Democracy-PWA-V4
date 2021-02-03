import React, { useEffect, useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { List } from 'rsuite'
import { getElectionList, Election} from '../utils/api/ElectionManagement'
import { getAccessToken} from '../utils/API';
import { Credentials } from '../utils/Authentication';


export default function ElectionList() {

    const ctx = useContext(Credentials);
    const[isLoading, setLoading] = useState(true);
    const[notLoggedin, setLoggedin] = useState(true);
    const[electionList, setElectionList] = useState<Array<Election>>([]);
    
    useEffect(()=>{
        ctx ? 
        //Check whether user is authenticated or not
        (ctx.credentials.authenticated ?
        // If user is authenticated, the compoenet will render the election list
        ( 
          getElectionList(ctx.credentials.token)
         .then((res)=>{
                setElectionList(res.data);
                setLoading(false);
        })): setLoggedin(false))
        : console.log('Please Login');
    }, [isLoading])

    //waiting for the response from getEletctionList 
    if(isLoading){
        if(notLoggedin){
            return <div>Please Login</div>
        }else{
            return <div>Loading...</div>
        }
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
