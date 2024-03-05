import axios from "axios";


const token = localStorage.getItem('token');

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${token}`
    },
};

export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};