import { Request, Response } from 'express';
import pool from "../config/db";

export async function handleGetSuggestedUsers(req: Request, res: Response): Promise<any> {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ error: "Missing user_id" });
    }

    try {
        const [rows]: any = await pool.execute(
            `SELECT user_id, username, email FROM users WHERE user_id != ? LIMIT 5`,
            [user_id]
        );

        const suggestedUsers = rows.map((user: any) => ({
            id: user.user_id,
            name: user.email.split('@')[0], // or any name field if you have it
            username: user.username,
            avatar: "/placeholder.svg?height=40&width=40" // or actual avatar if available
        }));

        res.status(200).json(suggestedUsers);
    } catch (error: any) {
        console.error("Error fetching suggested users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
