// pages/api/updatePoints.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { teamId, points }: { teamId: number; points: number } = req.body;

    try {
      // Database update logic here
      // Example: await updateTeamPoints(teamId, points);

      res.status(200).json({ success: true, message: 'Points updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update points' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
