import axios from "axios"
import { API_NOTIFICATION_MESSAGE, SERVICE_URL } from "../constant/config.js";


const URL = "http://localhost:8000"
const axiosInstance = axios.create({
    baseURL: URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response)
    },
    function (error) {
        return Promise.reject(ProcessError(error))
    }
)


const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const ProcessError = async (error) => {
    if (error.response) {
        console.log("errorrrr in res ProcessError", error.toJSON());
        return {
            isError: true,
            message: API_NOTIFICATION_MESSAGE.responseFailure,
            code: error.response.status
        }
    }
    else if (error.request) {
        console.log("ERROR IN request:ProcessError ", error.toJSON());
        return {
            isError: true,
            message: API_NOTIFICATION_MESSAGE.requestFailure,
            code: ""
        }
    }
    else {
        console.log("ERROR IN networkError: ProcessError", error.toJSON());
        return {
            isError: true,
            message: API_NOTIFICATION_MESSAGE.networkError,
            code: ""
        }
    }
}


const API = {};

for (const [key, value] of Object.entries(SERVICE_URL)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };