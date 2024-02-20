const { ObjectId } = require("mongodb");

class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }



    async createUser(userData) {
        const result = await this.User.insertOne(userData);
        return result.insertedId;
    }

    async updateUser(userId, updatedFields) {
        const result = await this.User.findOneAndUpdate(
            { _id: ObjectId.isValid(userId) ? new ObjectId(userId) : null },
            { $set: updatedFields },
            { returnOriginal: false }
        );
        return result.value;
    }

    async deleteUser(userId) {
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
        });

        return result.value;
    }

    async getUserById(userId) {
        return await this.User.findOne({
            _id: ObjectId.isValid(userId) ? new ObjectId(userId) : null
        });
    }

    async getUserByEmail(email) {
        return await this.User.findOne({ email });
    }

    async getAllUser() {
        try {
            const users = await this.User.find({}).toArray();
            return users;
        } catch (error) {
            throw new Error("Could not fetch users");
        }
    }

}

module.exports = UserService;
