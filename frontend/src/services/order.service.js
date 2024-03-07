import createApi from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/order") {
        this.api = createApi(baseUrl);
        this.api.interceptors.request.use(
            (config) => {
                const authToken = localStorage.getItem('token');
                if (authToken) {
                    config.headers.Authorization = `${authToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    async get(id) {
        return (await this.api.get(`/detail/${id}`)).data;
    }

    async getAllOfUser(userId) {
        return (await this.api.get(`/${userId}`)).data;
    }

    async getAll() {
        return (await this.api.get(`/`)).data;
    }

    async create(userId, name, address, phone, note) {
        const data = { userId, name, address, phone, note }
        return (await this.api.post("/", data)).data;
    }

    async update(id, status) {
        return (await this.api.put(`/${id}`, status)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

}

export default new OrderService();