import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Request, Response } from 'express';

// Create a new poll with options
export const createPoll = async (req: Request, res: Response): Promise<any> => {
    const { question, options } = req.body;

    if (!question || !Array.isArray(options) || options.length === 0) {
        return res.status(400).json({ error: 'Question and at least one option are required.' });
    }

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        // Insert the poll question into the polls table
        const [pollResult] = await conn.execute<ResultSetHeader>(
            `INSERT INTO polls (question) VALUES (?)`,
            [question]
        );
        const pollId = pollResult.insertId;

        // Insert options for the poll
        const insertOptions = options.map(opt =>
            conn.execute(
                `INSERT INTO poll_options (poll_id, option_text) VALUES (?, ?)`,
                [pollId, opt]
            )
        );

        await Promise.all(insertOptions);
        await conn.commit();

        res.status(201).json({ message: 'Poll created', pollId });
    } catch (err) {
        await conn.rollback();
        console.error('Poll creation failed:', err);
        res.status(500).json({ error: 'Failed to create poll' });
    } finally {
        conn.release();
    }
};

// Get all polls with their options and vote counts
export const getAllPolls = async (req: Request, res: Response): Promise<any> => {
    try {
        const [polls] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM polls ORDER BY created_at DESC`
        );

        const pollsWithOptions = await Promise.all(
            polls.map(async poll => {
                const [options] = await pool.query<RowDataPacket[]>(
                    `SELECT option_id, option_text, votes FROM poll_options WHERE poll_id = ?`,
                    [poll.poll_id]
                );
                return { ...poll, options };
            })
        );

        res.json(pollsWithOptions);
    } catch (err) {
        console.error('Error fetching polls:', err);
        res.status(500).json({ error: 'Failed to fetch polls' });
    }
};

export const votePoll = async (req: Request, res: Response): Promise<any> => {
    const { option_id } = req.body;

    if (!option_id) {
        return res.status(400).json({ error: 'Missing option_id' });
    }

    try {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE poll_options SET votes = votes + 1 WHERE option_id = ?`,
            [option_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Option not found' });
        }

        res.status(200).json({ message: 'Vote recorded' });
    } catch (err) {
        console.error('Error recording vote:', err);
        res.status(500).json({ error: 'Failed to vote' });
    }
};
