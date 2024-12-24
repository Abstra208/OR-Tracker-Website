'use client';

import '../style/users.css';
import { useState, useEffect } from "react";

export default function UsersPage() {
    const [Users, setUsers] = useState<JSX.Element[]>([]);
    useEffect(() => {
        fetch(`/api/user`)
            .then((res) => res.json())
            .then(async (data) => {
                console.log(data);
                const usersArray: JSX.Element[] = [];
                for (const user in data) {
                    usersArray.push(
                        <li key={user}>
                            <input type="radio" name="users" id={user} />
                            <label htmlFor={user}>
                                <img src={data[user].avatar} alt={`${data[user].username}'s avatar`} />
                                <div className='informations'>
                                    <p>{data[user].username}</p>
                                    <p>{data[user].id}</p>
                                </div>
                            </label>
                        </li>
                    );
                }
                setUsers(usersArray);
            })
            .catch((error) => console.error('Error fetching user:', error));
    }, []);
    const handleSearch = () => {
        const searchBox = document.getElementById('searchBox') as HTMLInputElement;
        const users = document.querySelectorAll('li');
        users.forEach((user) => {
            const label = user.querySelector('label');
            if (label && (!label.textContent || !label.textContent.toLowerCase().includes(searchBox.value.toLowerCase()))) {
                user.style.display = 'none';
            } else {
                user.style.display = 'block';
            }
        });
    }
    return (
        <main>
            <div className='users'>
                <h1>User List</h1>
                <div className='container'>
                    <section className='left'>
                        <div className='search'>
                            <input onChange={handleSearch} type="text" name="" id="searchBox" placeholder='Search for users...' />
                        </div>
                        <ul>
                            {Users}
                        </ul>
                    </section>
                    <section className='right'>
                        <div className='informations'>
                            <h2>Information</h2>
                            <div className='information'>
                                <p>Username: <span id='username'></span></p>
                                <p>ID: <span id='id'></span></p>
                                <p>Avatar: <span id='avatar'></span></p>
                            </div>
                        </div>
                    </section>
                </div>                
            </div>
        </main>
    );
}