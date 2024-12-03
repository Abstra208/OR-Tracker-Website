'use client';

import { div } from 'motion/react-client';
import React, { useEffect, useState } from 'react';

interface Params {
    id: string;
}

export default function UserPage({ params }: { params: Promise<Params> }) {
    const [record, setRecord] = useState<JSX.Element[]>([]);
    const [unwrappedParams, setUnwrappedParams] = useState<Params | null>(null);

    useEffect(() => {
        params.then((resolvedParams) => {
            setUnwrappedParams(resolvedParams);
        });
    }, [params]);

    useEffect(() => {
        const fetchrecord = async () => {
            if (unwrappedParams) {
                await fetch(`/api/record/info?id=${unwrappedParams.id}`)
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
    }, [unwrappedParams]);

    return (
        <div>
            <nav>
                <h1>Record Page</h1>
            </nav>
            <ul>
                {record}
            </ul>
        </div>
    );
}