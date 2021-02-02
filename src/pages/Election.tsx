import React from 'react'
import { useParams, Switch, Route, useRouteMatch} from 'react-router-dom'

export default function Election() {
    const { id } = useParams<Record<string,string | undefined>>()
    const { url } = useRouteMatch ()
    console.log(url)
    return (
        <div>
            The election Id is {id}
            <Switch>
                {/* Positions*/}
                <Route  path={`${url}/positions/:positionid`}>
                    positionid
                </Route>
                <Route  path={`${url}/positions`}>
                    position
                </Route>
                <Route  path={`${url}/platforms/:platformsid`}>
                    platformsid
                </Route>
                <Route path={`${url}/platforms`}>
                    platforms
                </Route>
                <Route path={`${url}/vote`}>
                    vote
                </Route>
            </Switch>
        </div>
    )
}
