import { getDatabase, ref, get, child } from 'firebase/database';
import { db } from '../auth/firebase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    try {
        const SnapshotServers = await get(child(ref(db), '/info/servers'));
        const servers = SnapshotServers.val();
        const SnapshotRecords = await get(child(ref(db), '/records'));
        const records = Object.keys(SnapshotRecords.val()).length;
        res.status(200).json({ servers: servers, records: records });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: (error as Error).message });
    }
}