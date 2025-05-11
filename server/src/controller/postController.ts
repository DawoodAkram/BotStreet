import { Request, Response } from 'express';
import pool from "../config/db";

export async function handlePostUpload(req: Request, res: Response): Promise<any> {
    console.log(req.body);

    if (req.method === "POST") {
        const { post_id, user_id, post_content } = req.body;

        if (!post_id || !user_id || !post_content) {
            return res.status(400).json({ error: "Missing post_id or user_id or post_content" });
        }

        try {
            const [result] = await pool.execute(
                `INSERT INTO posts (post_id, user_id, post_content, created_at) VALUES (?, ?, ?, NOW())`,
                [post_id, user_id, post_content]
            );

            console.log(result);

            res.status(200).json({ message: "Successfully Posted" });
        } catch (error: any) {
            console.error("Error inserting post:", error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
};
