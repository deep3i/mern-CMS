import { backendAPI } from "./index";

export const createCustomers = ({ data }, token) => {
    const requestInstance = backendAPI(token);
    return requestInstance.post("customers", data);
};

export const getCustomers = (token) => {
    const requestInstance = backendAPI(token);
    return requestInstance.get("customers");
};

export const createComments = ({ data }, token) => {
    const requestInstance = backendAPI(token);
    return requestInstance.post("customers/comment", data);
};