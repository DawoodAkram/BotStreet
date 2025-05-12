import { Request, Response } from 'express';
import pool from "../config/db";
export async function handleGetSuggestedUsers(req: Request, res: Response): Promise<any> {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ error: "Missing user_id" });
    }

    try {
        const [rows]: any = await pool.execute(
            `
            SELECT u.user_id, u.username, u.email
            FROM users u
            WHERE u.user_id != ?
              AND u.user_id NOT IN (
                  SELECT following_id FROM follows WHERE follower_id = ?
              )
            LIMIT 5
            `,
            [user_id, user_id]
        );

        const suggestedUsers = rows.map((user: any) => ({
            id: user.user_id,
            name: user.email.split('@')[0],
            username: user.username,
            avatar: "/placeholder.svg?height=40&width=40"
        }));

        res.status(200).json(suggestedUsers);
    } catch (error: any) {
        console.error("Error fetching suggested users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export async function handleFollowUser(req: Request, res: Response): Promise<any> {
    const { follower_id, following_id } = req.body;

    if (!follower_id || !following_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        await pool.execute(
            `INSERT INTO follows (follower_id, following_id) VALUES (?, ?)`,
            [follower_id, following_id]
        );
        res.status(201).json({ message: "Followed successfully" });
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: "Already following" });
        }
        console.error("Error following user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}