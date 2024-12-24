'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectToDiscord = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('https://discord.gg/qHt6dKqTJ3');
    }, [router]);

    return null;
};

export default RedirectToDiscord;