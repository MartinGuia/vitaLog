import jwt from "jsonwebtoken";
import config from "../config.js";
import Role from "../models/roles.model.js";

const verifyRoleAdmin =  (req, res, next) => { 
    try {
        // Body destructuring
    const {token} = req.cookies;

    // Returns status and message if token is fot found
    if (!token) return res.status(401).json({ message: "No token, autorization denied." });

    // Verify if token is valid
    jwt.verify(token, config.SECRET_KEY, async (err, user) => {
        
        // Returns status and message if token is valid
        if (err) return res.status(403).json({ message: "Invalid token"});
        
        // Find by id the name of the role
        const role = await Role.findById(user.role);

        // Validate if the role name is Admin
        if (role.name != "Master") {
            return res.status(401).json({ message: "Not authorized"});
        } else{
            next();
        };
    });
    } catch (error) {
       res.status(401).json({error})
        console.error(error) 
    }
};

export default verifyRoleAdmin