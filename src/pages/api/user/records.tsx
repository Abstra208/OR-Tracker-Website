import { ref, get, child } from 'firebase/database';
import { db } from '../auth/firebase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    try {
        const id = req.query.id as string;
        const snapshot = await get(child(ref(db), '/records'));
        const SnapshotRecords = snapshot.val();
        let records = [];

        for (const [key, value] of Object.entries(SnapshotRecords)) {
            if ((value as any).owner === id) {
                records.push( SnapshotRecords[key] );
            }
        }

        res.status(200).json({ records: records });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: (error as Error).message });
    }
}