import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import admin, { ServiceAccount } from 'firebase-admin';
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY as string);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as ServiceAccount),
        databaseURL: "https://or-tracker-c8b79-default-rtdb.firebaseio.com"
      });
}

const auth = admin.auth();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }

    const clientId = process.env.REACT_DISCORD_CLIENT_ID;
    const clientSecret = process.env.REACT_DISCORD_CLIENT_SECRET;
    const redirectUri = process.env.REACT_DISCORD_REDIRECT_URI;

    const tokenUrl = 'https://discord.com/api/oauth2/token';
    const params = ({
        client_id: clientId!,
        client_secret: clientSecret!,
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: redirectUri!,
        scope: 'identify',
    });

    try {
        const response = await axios.post(tokenUrl, new URLSearchParams(params), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.status !== 200) {
            res.status(400).json({ error: 'Failed to request access code' });
        }

        const { access_token } = response.data;

        const userInfoResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
            Authorization: `Bearer ${access_token}`,
            },
        });

        const { id, username, email } = userInfoResponse.data;

        const firebaseToken = await auth.createCustomToken(id, {
            email: email,
            displayName: username
        });

        res.status(200).json({ token: firebaseToken });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}