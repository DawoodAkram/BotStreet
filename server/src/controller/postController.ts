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
        await pool.execute(
            `INSERT INTO posts (post_id, user_id, post_content, created_at) VALUES (?, ?, ?, NOW())`,
            [post_id, user_id, post_content]
        );

        res.status(200).json({ message: "Successfully Posted" });
    } catch (error: any) {
        console.error("Error inserting post:", error);
        res.status(500).json({ error: error.message });
    }
}


export async function handleGetAllPosts(req: Request, res: Response): Promise<any> {
    const user_id = req.query.user_id; // current logged-in user

    try {
        const [rows]: any = await pool.execute(`
            SELECT 
                posts.post_id,
                posts.post_content,
                posts.created_at,
                users.username,
                users.email,
                EXISTS (
                    SELECT 1 FROM likes
                    WHERE likes.post_id = posts.post_id AND likes.user_id = ?
                ) AS liked,
                (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.post_id) AS likes_count,
                (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.post_id) AS comments_count
            FROM posts
            JOIN users ON posts.user_id = users.user_id
            ORDER BY posts.created_at DESC
        `, [user_id]);

        const formattedPosts = rows.map((row: any) => ({
            id: row.post_id,
            author: {
                name: row.email.split('@')[0],
                username: row.username,
                avatar: "/placeholder.svg?height=40&width=40"
            },
            content: row.post_content,
            timestamp: row.created_at,
            likes: row.likes_count,
            comments: row.comments_count,
            shares: Math.floor(Math.random() * 10), // optional dummy data
            department: "General",
            liked: !!row.liked,
        }));

        res.status(200).json(formattedPosts);
    } catch (error: any) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



export async function handleLikePost(req: Request, res: Response): Promise<any> {
    try {
        const { user_id, post_id } = req.body;

        if (!user_id || !post_id) {
            console.log("Missing user_id or post_id:", req.body);
            return res.status(400).json({ error: 'user_id and post_id are required' });
        }

        // Check if already liked
        const [existing] = await pool.execute(
            'SELECT * FROM likes WHERE user_id = ? AND post_id = ?',
            [user_id, post_id]
        );

        if ((existing as any[]).length > 0) {
            // Already liked, so removing it (unlike)
            await pool.execute(
                'DELETE FROM likes WHERE user_id = ? AND post_id = ?',
                [user_id, post_id]
            );
            return res.status(200).json({ message: 'Like removed' });
        } else {
            await pool.execute(
                'INSERT INTO likes (user_id, post_id, created_at) VALUES (?, ?, NOW())',
                [user_id, post_id]
            );
            return res.status(200).json({ message: 'Like added' });
        }
    } catch (error: any) {
        console.error('Error toggling like:', error);
        return res.status(500).json({ error: 'Failed to toggle like' });
    }
}

export async function handleCommentPost(req: Request, res: Response): Promise<any> {
    try {
        const { user_id, post_id, comment_text } = req.body;

        if (!user_id || !post_id || !comment_text) {
            return res.status(400).json({ error: 'user_id, post_id, and comment_text are required' });
        }

        const [result] = await pool.execute(
            `INSERT INTO comments (user_id, post_id, comment_text, created_at) VALUES (?, ?, ?, NOW())`,
            [user_id, post_id, comment_text]
        );

        return res.status(200).json({ message: 'Comment added successfully' });
    } catch (error: any) {
        console.error('Error adding comment:', error);
        return res.status(500).json({ error: 'Failed to add comment' });
    }
}


export async function handleGetPostById(req: Request, res: Response): Promise<any> {
    const post_id = req.params.id;

    if (!post_id) {
        return res.status(400).json({ error: "Post ID is required" });
    }

    try {
        // Fetch post and author
        const [postRows]: any = await pool.execute(`
            SELECT 
                posts.post_id,
                posts.post_content,
                posts.created_at,
                users.username,
                users.email
            FROM posts
            JOIN users ON posts.user_id = users.user_id
            WHERE posts.post_id = ?
        `, [post_id]);

        if (postRows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        const post = postRows[0];

        // Fetch total likes
        const [likeRows]: any = await pool.execute(`
            SELECT COUNT(*) AS like_count
            FROM likes
            WHERE post_id = ?
        `, [post_id]);

        const likes = likeRows[0]?.like_count || 0;

        // Fetch comments with commenter usernames
        const [commentRows]: any = await pool.execute(`
            SELECT c.comment_text, u.username
            FROM comments c
            JOIN users u ON c.user_id = u.user_id
            WHERE c.post_id = ?
            ORDER BY c.created_at ASC
        `, [post_id]);

        return res.status(200).json({
            id: post.post_id,
            content: post.post_content,
            created_at: post.created_at,
            author: {
                username: post.username,
                email: post.email
            },
            likes,
            comments: commentRows
        });
    } catch (error: any) {
        console.error("Error fetching post:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}



