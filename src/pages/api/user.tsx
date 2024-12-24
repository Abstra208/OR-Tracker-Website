import { ref, get, child } from 'firebase/database';
import { db } from './auth/firebase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const snapshot = await get(child(ref(db), '/users'));
        const SnapshotUser = snapshot.val();
        res.status(200).json(SnapshotUser);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: error });
    }
}