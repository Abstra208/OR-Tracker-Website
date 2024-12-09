'use client';

import React, { useEffect, useState } from 'react';

interface Params {
    id: string;
}

export default function RecordPage({ params }: { params: Promise<Params> }) {
    const [record, setRecord] = useState<JSX.Element[]>([]);
    const [ID, setID] = useState<Params | null>(null);

    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const userId = pathSegments[pathSegments.length - 1];
        setID({ id: userId });
    }, []);

    useEffect(() => {
        const fetchrecord = async () => {
            if (ID) {
                await fetch(`/api/records/info?id=${ID.id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        const record: JSX.Element[] = [];
                        record.push(
                            <li key={data.records.name}>
                                <h2>{data.records.name}</h2>
                                <p>{data.records.description}</p>
                                <p>{data.records.link}</p>
                                <p>{data.records.owner}</p>
                            </li>
                        );
                        setRecord(record);
                    })
                    .catch((error) => console.error('Error fetching user data:', error));
            } else {
                return;
            }
        };
        fetchrecord();
    }, [ID]);

    return (
        <main>
            <nav>
                <h1>Record Page</h1>
            </nav>
            <ul>
                {record}
            </ul>
        </main>
    );
}