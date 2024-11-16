'use client';

import { useEffect } from 'react';

export default function Invite() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const methode = urlParams.get('methode');

            if (methode) {
                window.location.href = 'https://discord.gg/qHt6dKqTJ3';
            } else {
                window.location.href = 'https://discord.com/oauth2/authorize?client_id=1294873348387635230';
            }
        }
    }, []);

    return null;
}