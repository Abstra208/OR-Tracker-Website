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
                            <div>
                                <h2>{data.name}</h2>
                                <p>{data.description}</p>
                            </div>
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
            {record}
        </div>
    );
}