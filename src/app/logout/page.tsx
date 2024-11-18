"use client";

import Cookies from "js-cookie";

export default function Logout() {
    Cookies.remove('access_token');
    window.location.href = '/';
    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};