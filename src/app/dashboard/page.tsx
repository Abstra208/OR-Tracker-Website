"use client";

import { use, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { animate, stagger } from "motion";
import "../dashboard.css";
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, set, get, child, update, remove } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

let app: ReturnType<typeof initializeApp> | null = null;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

const db = getDatabase(app);

if (typeof window !== 'undefined' && Cookies.get('access_token') === undefined) {
    window.location.href = '/login';
}

export default function Dashboard() {
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [user_role, setUserRole] = useState('Guest');
    interface Record {
        name: string;
        description: string;
        imageUrl?: string;
    }

    const [records, setRecords] = useState<{ [key: string]: Record }>({});

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const Recordsnapshot = await get(child(ref(db), '/records'));
                setRecords(Recordsnapshot.val());
            } catch (error) {
                console.error('Erreur lors de la récupération des enregistrements:', error);
            }
        };

        fetchRecords();
    }, [db]);

    const records_list = [];

    for (const record in records) {
        records_list.push(
            <li key={record}>
                <input type="checkbox" id={record} name={record} />
                <label htmlFor={record}>
                    <h2>{records[record].name}</h2>
                    <p>{records[record].description}</p>
                </label>
            </li>
        );
    }

    useEffect(() => {
        if (typeof document !== 'undefined') {
            animate([
                ["#records_section li", { opacity: [0, 1] }, { delay: stagger(.2) }]
            ]);
        }
    });

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key.length === 1 && event.key.match(/[a-zA-Z0-9]/) || event.key === 'Enter') {
                document.getElementById('search')?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = Cookies.get('access_token');

                const userResponse = await axios.get('https://discord.com/api/users/@me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                const { id, avatar } = userResponse.data;

                setUsername(userResponse.data.username);
                setId(userResponse.data.id);
                setAvatar(userResponse.data.avatar);
                setAvatarUrl(`https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=64`);
            } catch (error) {
                setUsername('Guest');
                setId('0');
                setAvatar('0');
                setAvatarUrl('https://cdn.discordapp.com/embed/avatars/0.png');
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const permission = await get(child(ref(db), `/permission/admin/`));
                if (permission.val().includes(id)) {
                    setUserRole('Admin');
                } else {
                    setUserRole('Guest');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des permissions:', error);
            }
        };

        fetchPermissions();
    }, [id, db]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof document !== 'undefined') {
            const search = e.target.value.toLowerCase();
            const records_list = document.querySelectorAll('ul li');

            records_list.forEach((record) => {
                const nameElement = record.querySelector('h2');
                const descriptionElement = record.querySelector('p');

                const name = nameElement?.textContent?.toLowerCase() || '';
                const description = descriptionElement?.textContent?.toLowerCase() || '';

                if (name.includes(search) || description.includes(search)) {
                    (record as HTMLElement).style.display = 'block';
                } else {
                    (record as HTMLElement).style.display = 'none';
                }
            });
        } else {
            console.error('Erreur lors de la recherche:', 'document is not defined');
        }
    }

    return (
        <div id='dashboard'>
            <nav>
                <div className='left'>
                    <img src="/or_records.png" alt="Record Tracker Logo" />
                    <h1>OR Records</h1>
                </div>
                <div className='right'>
                    <button>
                        <h1>{username} as {user_role}</h1>
                        <img src={avatarUrl} alt={`${username}'s avatar`} />
                    </button>
                    <div>
                    <a href='/logout'>Log out</a>
                    </div>
                </div>
            </nav>
            <main>
                <aside>
                    <button>Records</button>
                    <button>Tools</button>
                    <button>Settings</button>
                </aside>
                <section>
                    <div className='left' id='records_section'>
                        <div className='search'>
                            <input type="text" placeholder='Press Enter or start typing' name="search" id="search" onChange={handleSearch} />
                        </div>
                        <ul>{records_list}</ul>
                    </div>
                    <div className='right' id='tools_section'>
                        <button>Add</button>
                        <button>Edit</button>
                        <button>Delete</button>
                        <button>Export All</button>
                    </div>                    
                </section>
            </main>
        </div>
    );
};