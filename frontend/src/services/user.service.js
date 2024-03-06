import createApi from "./api.service";

class UserService {
    constructor(baseUrl = "/api/auth") {
        this.api = createApi(baseUrl);
    }

    async register(user) {
        try {
            return (await this.api.post(`/register`, user)).data
        } catch (error) {
            console.log(error);
        }
    }

    async login(user) {
        try {
            return (await this.api.post(`/login`, user)).data
        } catch (error) {
            console.log(error);
        }
    }

    async logout() {
        try {
            return (await this.api.get(`/logout`)).data
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            return (await this.api.get(`/`)).data
        } catch (error) {
            console.log(error);
        }
    }

    async getByEmail(email) {
        try {
            return (await this.api.get(`/${email}`)).data
        } catch (error) {
            console.log(error);
        }
    }

    async checkEmail(email) {
        try {
            return (await this.api.get(`/check-email/${email}`)).data
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, user) {
        try {
            return (await this.api.put(`/${id}`, user)).data
        } catch (error) {
            console.log(error);
        }
    }
    async delete(id) {
        try {
            return (await this.api.delete(`/${id}`)).data
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UserService();