import { ref, get, child } from 'firebase/database';
import { db } from '../auth/firebase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    try {
        let servers = 0;
        let records = 0;
        let users = 0;
        const SnapshotServers = await get(child(ref(db), '/info/servers'));
        if (SnapshotServers.exists()) {
            servers = SnapshotServers.val();
        }
        const SnapshotRecords = await get(child(ref(db), '/records'));
        if (SnapshotRecords.exists()) {
            records = Object.keys(SnapshotRecords.val()).length;
        }
        const SnapshotUsers = await get(child(ref(db), '/users'));
        if (SnapshotUsers.exists()) {
            users = Object.keys(SnapshotUsers.val()).length;
        }
        res.status(200).json({ servers: servers, records: records, users: users });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: (error as Error).message });
    }
}