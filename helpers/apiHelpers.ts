import { requestHelper } from "./requestHelpers";

export const adminLogin = async (email: string, password: string) => {
    return await requestHelper("POST", "/auth/login", { name: email, password });
}