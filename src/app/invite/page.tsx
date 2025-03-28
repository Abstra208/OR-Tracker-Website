'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectToDiscord = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('https://discord.com/oauth2/authorize?client_id=1294873348387635230');
    }, [router]);

    return null;
};

export default RedirectToDiscord;