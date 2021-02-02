import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { List } from 'rsuite'

interface position {
    id: string
    candidate: Array<string>
    title: string
    description: string
    election: string
}
interface electionResponse {
    id: string
    positions: Array<position>
    created: string
    title: string
    description: string
    enable_multiple_submissions: boolean
    election_email_domain: string
    submission_start_time: string
    submission_end_time: string
    voting_start_time: string
    voting_end_time: string
    manager: string
}
export default function ElectionList() {
    const data = ['Roses are red', 'Violets are blue', 'Sugar is sweet', 'And so are you'];

    return (
        <div>
            <List bordered>
                {data.map((item, index) => (
                <List.Item key={index} index={index}>
                    <Link to="/">{item}</Link>
                </List.Item>
                ))}
            </List>
        </div>
    )
}
