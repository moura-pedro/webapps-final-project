const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists'
            });
        }

        // Create new user
        const user = new User({
            username,
            email,
            password
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Registration successful'
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during registration'
        });
    }
});

// Sign in route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Create session cookie with modified settings
        res.cookie('sessionId', user._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',  // Added this
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            path: '/'  // Added this
        });

        console.log('Setting cookie with sessionId:', user._id); // Debug log

        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Sign in error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during sign in'
        });
    }
});

// Check auth status route - update with more logging
router.get('/check-auth', async (req, res) => {
    try {
        console.log('Received auth check request'); // Debug log
        console.log('Cookies received:', req.cookies); // Debug log
        
        const sessionId = req.cookies.sessionId;
        
        if (!sessionId) {
            console.log('No sessionId cookie found'); // Debug log
            return res.status(401).json({
                success: false,
                message: 'No session found'
            });
        }

        const user = await User.findById(sessionId);
        console.log('Found user:', user ? 'yes' : 'no'); // Debug log

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid session'
            });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Auth check error:', error);
        res.status(500).json({
            success: false,
            message: 'Error checking authentication status'
        });
    }
});

router.post('/signout', (req, res) => {
    try {
        res.clearCookie('sessionId', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });
        
        res.json({
            success: true,
            message: 'Signed out successfully'
        });
    } catch (error) {
        console.error('Sign out error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during sign out'
        });
    }
});

module.exports = router;