'use client';

export default function UsersPage() {

    const handleSubmit = () => {
        const id = document.getElementById('id') as HTMLInputElement
        const value = id.value;
        window.location.href = `/users/${value}`;
    }
    return (
        <main>
            <h1>Users</h1>
            <input type="number" name="" id="id" />
            <button onClick={handleSubmit}>Submit</button>
        </main>
    );
}