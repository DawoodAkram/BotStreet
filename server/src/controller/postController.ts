import { Request, Response } from 'express';
import pool from "../config/db";
import { v4 as uuidv4 } from 'uuid';


export async function handlePostUpload(req: Request, res: Response): Promise<any> {
    console.log(req.body);

    const { user_id, post_content } = req.body;

    if (!user_id || !post_content) {
        return res.status(400).json({ error: "Missing user_id or post_content" });
    }
    const post_id = uuidv4();


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
};


export async function handleGetAllPosts(req: Request, res: Response) {
    try {
        const [rows]: any = await pool.execute(`
            SELECT 
                posts.post_id,
                posts.post_content,
                posts.created_at,
                users.username,
                users.email
            FROM posts
            JOIN users ON posts.user_id = users.user_id
            ORDER BY posts.created_at DESC
        `);


        const formattedPosts = rows.map((row: any) => ({
            id: row.post_id,
            author: {
                name: row.email.split('@')[0], // or any logic you want
                username: row.username,
                avatar: "/placeholder.svg?height=40&width=40"
            },
            content: row.post_content,
            timestamp: row.created_at, // Helper function below
            likes: Math.floor(Math.random() * 50),
            comments: Math.floor(Math.random() * 15),
            shares: Math.floor(Math.random() * 10),
            department: "General"
        }));

        res.status(200).json(formattedPosts);
    } catch (error: any) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}


function formatTimeSince(date: string | Date): string {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
}
