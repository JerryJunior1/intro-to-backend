import {User} from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //basic validation

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        //check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: "User already exists" });
        }

        //create user
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Error creating user" });
    }
}

const loginUser = async (req, res) => {
    try {
        
        // checking if the user already exists
        const { email, password } = req.body;
       
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({
             message: "User not found"
        });

       
        // compare passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"

        })

        res.status(200).json({
            message: "User Logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username 
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const logoutuser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(404).json({
            message: "User not found"
        });
         
        res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
    }   
}



export { registerUser, loginUser, logoutuser };