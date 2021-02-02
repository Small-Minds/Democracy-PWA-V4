import React from 'react'
import { useParams } from 'react-router-dom'
export default function ElectionInfo() {
    let{ id } = useParams<Record<string,string | undefined>>();
    return (
        <div>
            <h3>Election Id: {id}</h3>
        </div>
    )
}
