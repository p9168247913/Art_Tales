const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { registerArtistLoverValidation, loginArtistLoverValidation } = require('../../validations/user-artist-lover/userArtistLover.validations');
const UserArtistLoverModel = require('../../models/user-artist-lover/userArtistLover.model');

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domainRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email) && domainRegex.test(email);
}

const registerUser = async (req, res) => {
    const { error } = registerArtistLoverValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const {
        name,
        phoneNumber,
        dob,
        email,
        password,
        confirmPassword,
        artistLover,
    } = req.body;

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
        return res.status(400).json({ msg: 'Invalid email format!!' });
    }

    if (password.length < 8) {
        return res.status(400).json({ msg: 'Password should be at least 8 characters long!!' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Passwords and Confirm Password does not match!!' });
    }

    try {
        const existingUser = await UserArtistLoverModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists!!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserArtistLoverModel({
            name,
            phoneNumber,
            dob,
            email,
            password: hashedPassword,
            confirmPassword: undefined,
            artistLover,
        });

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully!!', data: newUser });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to register user!!' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const { error } = loginArtistLoverValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
        return res.status(400).json({ msg: 'Invalid email format!!' });
    }

    try {
        const user = await UserArtistLoverModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'User not found. Try Registering!!' });
        }

        const blockedUser = await UserArtistLoverModel.findOne({ email })

        if (blockedUser.isBlocked === true) {
            return res.status(403).json({ error: "Cann't Login, Your account is blocked" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password!!' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({ message: 'Login successful!!', token: token, Email: user.email, ArtistName: user.name });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to login!!' });
    }
};

const getUnblockedArtists = async (req, res) => {
    try {
        const user = await UserArtistLoverModel.find({ isBlocked: false });
        if (!user) {
            return res.status(404).json({ msg: 'No user found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

const blockArtist = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserArtistLoverModel.findOneAndUpdate({ email }, { isBlocked: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User blocked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const unblockArtist = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserArtistLoverModel.findOneAndUpdate({ email }, { isBlocked: false });

        if (!user) {
            return res.status(404).json({ error: 'Artist not found' });
        }
        res.json({ message: 'Artist unblocked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const getBlockedArtists = async (req, res) => {
    try {
        const blockedUsers = await UserArtistLoverModel.find({ isBlocked: true });
        if (!blockedUsers) {
            return res.status(404).json({ msg: 'No user found' });
        }
        res.status(200).json({ user: blockedUsers });
    } catch (error) {
        console.log(error);
    }
};

const getAllArtistLovers = async (req, res) => {
    try {
        const user = await UserArtistModel.find();
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUnblockedArtists,
    blockArtist,
    unblockArtist,
    getBlockedArtists,
    getAllArtistLovers,
}