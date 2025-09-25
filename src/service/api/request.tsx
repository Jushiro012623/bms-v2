import axios, { type AxiosResponse } from "axios";
import { config as app } from "../../config/app";

/*
 *
 * TYPES AND INTERFACES
 *
 */
type TToken = string | null | undefined;

type TTokenResponse = {
    access_token: string;
    expires_in: number | string;
    token_type: string;
    user: any;
};
export type TLoginResponse = {
    message: string;
    data: TTokenResponse;
    status: number;
    success: string;
};
export type TResponse = {
    data: TLoginResponse;
    status: number;
};

export const Api = axios.create({
    baseURL: app.apiUrl,
    timeout: 5000,
    headers: { Accept: "application/json" },
});

Api.interceptors.request.use(
    async (config: any) => {
        const token: TToken | null = getCookie("_accessToken");
        console.log("Token in interceptor:", token);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error: any) => {
        console.error("Interceptor error:", error);
        return Promise.reject(error);
    }
);

/*
 *
 * DO BEFORE RESPONSE
 *
 */
Api.interceptors.response.use(
    (response: any) => {
        return response;
    },
    async function (error: any) {
        return Promise.reject(error);
    }
);

/*
 *
 * HELPERS
 *
 */
/**
 *
 * @description get user token in cookies
 * @param {string} name - name of cookies
 *
 */
const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;

    return null;
};
