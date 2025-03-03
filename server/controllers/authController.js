const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.registerUser = async(req,res)=>{
    try{
        const { name , email ,password ,role}=req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required." });
        }
        let user = await User.findOne({email});

        if(user){
            res.status(400).json({message:'User Already Exists'});
        }

        const hashedPassword = await bcrypt.hash(password,10);

          user = new User ({name ,email ,password:hashedPassword ,role});

          await user.save();

        res.status(201).json({message:'User registered Succefully'});
    }
    catch(error){
        res.status(500).json({message:'Error in register'},error);
    }
  
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            logger.warn(`Login failed for email: ${email}`);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPassMatch = await bcrypt.compare(password, user.password);

        if (!isPassMatch) {
            return res.status(400).json({ message: 'Password does not match' }); // ✅ Return to prevent further execution
        }

        const token = generateToken(user._id);
        
        res.json({ message: 'Login successful', token, role: user.role, user });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};
