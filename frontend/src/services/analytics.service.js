import createApi from "./api.service";

class AnalyticsService {
    constructor(baseUrl = "/api/analytics") {
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

    async getRevenue(month, year) {
        const data = { month, year };
        return (await this.api.post(`/revenue-month`, data)).data;
    }

    async getProductRatio(month, year) {
        const data = { month, year };
        return (await this.api.post(`/product-ratio`, data)).data;
    }

}

export default new AnalyticsService();