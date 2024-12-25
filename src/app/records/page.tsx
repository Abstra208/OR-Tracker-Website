'use client';

import { useEffect, useState } from "react";

export default function Records() {
    const [records, setRecords] = useState<JSX.Element[]>([]);
    useEffect(() => {
        fetch(`/api/records`)
            .then((res) => res.json())
            .then(async (data) => {
                const recordsArray: JSX.Element[] = [];
                for (const record in data) {
                    recordsArray.push(
                        <li key={record}>
                            <h2>{data[record].name}</h2>
                            <p>{data[record].description}</p>
                            <p>{data[record].link}</p>
                            <p>{data[record].owner}</p>
                        </li>
                    );
                }
                setRecords(recordsArray);
            })
            .catch((error) => console.error('Error fetching user:', error));
    }, []);
    return (
        <main>
            <h1>Records</h1>
            <ul>
                {records}
            </ul>
        </main>
    );
}