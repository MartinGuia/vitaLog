import Role from "../models/roles.model.js";

export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find()
        return res.status(200).json(roles)
    } catch (error) {
        return res.status(500).json(error);
    }
}