import createApi from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/product") {
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

    async getAll() {
        return (await this.api.get("/")).data;
    }

    async getCategory(category) {
        return (await this.api.get(`/category/${category}`)).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new ProductService();