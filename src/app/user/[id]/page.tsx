'use client';

import React, { useEffect, useState } from 'react';

interface Params {
    id: string;
}

export default function UserPage({ params }: { params: Promise<Params> }) {
    const [records_list, setRecordsList] = useState<JSX.Element[]>([]);
    const [profile, setProfile] = useState<JSX.Element[]>([]);
    const [badges, setBadges] = useState<JSX.Element[]>([]);
    const [unwrappedParams, setUnwrappedParams] = useState<Params | null>(null);

    useEffect(() => {
        params.then((resolvedParams) => {
            setUnwrappedParams(resolvedParams);
        });
    }, [params]);

    useEffect(() => {
        const fetchrecords = async () => {
            if (unwrappedParams) {
                await fetch(`/api/user/records?id=${unwrappedParams.id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        const records: JSX.Element[] = [];
                        for (const [key, value] of Object.entries(data.records)) {
                            records.push(
                                <li key={key}>
                                    <h2>{(value as any).name}</h2>
                                    <p>{(value as any).description}</p>
                                </li>
                            );
                        }
                        setRecordsList(records);
                    })
                    .catch((error) => console.error('Error fetching user data:', error));
            } else {
                return;
            }
        };
        const fetchdiscord = async () => {
            if (unwrappedParams) {
                await fetch(`/api/user/discord?id=${unwrappedParams.id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        const profile: JSX.Element[] = [];
                        const badges: JSX.Element[] = [];
                        for (const [key, value] of Object.entries(data.badges)) {
                            badges.push(
                                <li key={key}>
                                    <h1>{value as React.ReactNode}</h1>
                                </li>
                            );
                        }
                        profile.push(
                            <li key={data.id}>
                                <h2>{data.username}</h2>
                                <img src={data.avatar} alt="Avatar" />
                            </li>
                        );
                        setBadges(badges);
                        setProfile(profile);
                    })
                    .catch((error) => console.error('Error fetching discord data:', error));
            } else {
                return;
            }
        }
        fetchrecords();
        fetchdiscord();
    }, [unwrappedParams]);

    return (
        <div>
            <nav>
                <h1>User Page</h1>
            </nav>
            <div>
                <h2>Profile</h2>
                <ul>
                    {profile}
                </ul>
                <ul>
                    {badges}
                </ul>
            </div>
            <div>
                <h2>Records</h2>
                <ul>
                    {records_list}
                </ul>
            </div>
        </div>
    );
}