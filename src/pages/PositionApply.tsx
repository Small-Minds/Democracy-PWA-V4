import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { getPosition, Position } from '../utils/api/PositionApplication';
import { User } from '../utils/api/User';
import { Credentials } from '../utils/Authentication';
import Loading from './Loading';

function PositionApply() {
  const [t] = useTranslation();
  const history = useHistory();
  let{positionId} = useParams<any>();
  const [position, setPosition] = useState<Position>();
  const ctx = useContext(Credentials);
  const user = useContext(User);
 

  useEffect(()=>{
    //Return early if no context is provided.
    if(!ctx || !ctx.credentials.authenticated) return;
    //If logged in, attempt to get the position details
    getPosition(positionId)
        .then((res) => {
            setPosition(res);
        })
        .catch((err)=>{
            console.error(err)
        })
  },[]);

  
  return (
      <div>
          {position ? 
            <div>
                <h1>{position.title}</h1>
                <p>{position.description}</p>
            </div> 
            : <Loading/> 
        }
      </div> 
  );
}

export default PositionApply;
