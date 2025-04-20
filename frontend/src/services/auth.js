import { backendAPI } from "./index";

export const createNewUser = ({ data }) => {
    const requestInstance = backendAPI();
    return requestInstance.post("auth/register", data);
};

export const loginExistingUser = ({ data }) => {
    const requestInstance = backendAPI();
    return requestInstance.post("auth/login", data);
};

export const logoutLoggedInUser = (token) => {
    const requestInstance = backendAPI(token);
    return requestInstance.post('auth/logout');
};