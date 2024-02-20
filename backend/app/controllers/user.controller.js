require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.utils");

exports.register = async (req, res, next) => {
    const { name, email, password, isAdmin } = req.body;

    try {
        const isAdminValue = typeof isAdmin === 'boolean' ? isAdmin : false;

        const userService = new UserService(MongoDB.client);
        const existingUser = await userService.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await userService.createUser({ name, email, password: hashedPassword, isAdmin: isAdminValue });
        return res.status(201).json({ message: "Register is successfully" });
    } catch (error) {
        console.error(error);
        return next(new Error("An error occurred while registering the user"));
    }
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const userService = new UserService(MongoDB.client);
        const user = await userService.getUserByEmail(email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return next(new Error("An error occurred while logging in"));
    }
};

exports.updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const updatedFields = req.body;

    try {
        const userService = new UserService(MongoDB.client);
        const user = await userService.getUserById(userId);


        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.name == updatedFields.name && user.password == updatedFields.password) {
            return res.status(201).json({ message: "Nothing be change" })
        }
        const updatedUser = { ...user, ...updatedFields };

        await userService.updateUser(userId, updatedUser);

        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        return next(new Error("An error occurred while updating the user"));
    }
};

exports.deleteUser = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const userService = new UserService(MongoDB.client);

        const deletedUser = await userService.deleteUser(userId);
        return res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.error(error);
        return next(new Error("An error occurred while deleting the user"));
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const users = await userService.getAllUser();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return next(new Error("An error occurred while fetching users"));
    }
}

// exports.getById = async (req, res, next) => {
//     try {
//         const userService = new UserService(MongoDB.client);
//         const user = await userService.getUserById(req.params.userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         return res.status(200).json(user);
//     } catch (error) {
//         console.error(error);
//         return next(new Error("An error occurred while fetching users"));
//     }
// }

exports.getByEmail = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const user = await userService.getUserByEmail(req.params.email);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return next(new Error("An error occurred while fetching users"));
    }
}

exports.logout = async (req, res, next) => {
    res.clearCookie("token");

    return "Logout";
};