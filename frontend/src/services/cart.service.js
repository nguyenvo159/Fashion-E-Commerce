import createApi from "./api.service";

class CartService {
    constructor(baseUrl = "/api/cart") {
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
        return (await this.api.get(`/${id}`)).data;
    }

    async quantity(id, productId) {
        return (await this.api.get(`/quantity/${id}/${productId}`)).data;
    }

    async update(userId, productId, quantity, size) {
        const data = { userId, productId, quantity, size }
        return (await this.api.post("/", data)).data;
    }

    async removeItem(id, productId, size) {
        return (await this.api.delete(`/remove/${id}/${productId}/${size}`)).data;
    }

    async clearCart(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new CartService();