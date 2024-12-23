'use client';

export default function Records() {

    const handleSubmit = () => {
        const id = document.getElementById('id') as HTMLInputElement
        const value = id.value;
        window.location.href = `/records/${value}`;
    }
    return (
        <main>
            <h1>Records</h1>
            <input type="text" name="" id="id" required placeholder="Enter the record ID" />
            <button onClick={handleSubmit}>Submit</button>
        </main>
    );
}