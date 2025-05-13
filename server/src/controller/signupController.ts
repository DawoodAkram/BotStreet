import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import pool from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;

export const handleRegisterUser = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password } = req.body;
  console.log("Received registration request:", req.body);  // Check if data is received
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if email already exists
    const [existingUser]: any = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    // Check if username already exists
    const [existingName]: any = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (existingName.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);
    await pool.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    console.log('User inserted into DB');  // Check if user is inserted into the DB

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message, error.stack);
    res.status(500).json({ error: 'Error registering user' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows]: any = await pool.execute(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user.user_id, username: user.username });
    console.log('User logged in successfully:', user.user_id);  // Check if user is logged in successfully
  } catch (error) {
    console.error('Login error:', error.message, error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update User Details
export const updateUserDetails = async (req: Request, res: Response): Promise<any> => {
  const { userId, username, email, password } = req.body;
  console.log("Received update request:", req.body);

  // Input validation
  if (!userId || (!username && !email && !password)) {
    return res.status(400).json({ error: 'At least one field (username, email, or password) is required to update' });
  }

  try {
    let updateQuery = 'UPDATE users SET ';
    const values: any[] = [];

    if (username) {
      updateQuery += 'username = ?, ';
      values.push(username);
    }
    if (email) {
      updateQuery += 'email = ?, ';
      values.push(email);
    }
    if (password) {
      // Hash the password if it's provided
      const hashedPassword = await bcrypt.hash(password, 10);
      updateQuery += 'password = ?, ';
      values.push(hashedPassword);
    }

    // Remove the trailing comma and space
    updateQuery = updateQuery.slice(0, -2);
    updateQuery += ' WHERE user_id = ?';
    values.push(userId);

    // Execute the update query
    await pool.execute(updateQuery, values);
    console.log('User details updated in DB');

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error('Error updating user details:', error.message, error.stack);
    res.status(500).json({ error: 'Error updating user details' });
  }
};

export const fetchUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const uid = req.params.uid;

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    if (!uid) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Validate token
    jwt.verify(token, SECRET_KEY);

    const query = 'SELECT user_id, username, email FROM users WHERE user_id = ?';
    const [rows]: any = await pool.execute(query, [uid]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];
    res.status(200).json({
      userId: user.user_id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
