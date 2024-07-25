import { AxiosResponse } from "axios";
import { custom_axios } from "./custom_axios";
import alertify from "../notifications/toast/alert_service";

const returnToHome = (error: any) => {
    if (error.response.status >= 400 && error.response.status !== 401) return alertify.error(error.response.data.error);
    if (error.response.status === 401) alertify.error(error.response.data.error);
    setTimeout(() => {
        window.location.href = "http://localhost:3000/";
    }, 3000);
}
export const uploadContentImagesService = async (
    data: FormData
): Promise<AxiosResponse | any> => {
    try {
        const endpoint = "/admin/upload-content-images";
        const res = await custom_axios(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data,
        });
        return res.data.urls;
    } catch (error: any) {
        returnToHome(error);
    }
};

export const uploadContent = async (data: FormData): Promise<void | any> => {
    try {
        const endpoint = "/admin/create-post";
        const res = await custom_axios(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            },
            data,
        });
        if (res.status === 201) alertify.success(res.data.message);
    } catch (error: any) {
        returnToHome(error);
    }
}

export const getPreviewPosts = async (): Promise<AxiosResponse | any> => {
    try {
        const endpoint = "/admin/get-preview-posts";
        const res = await custom_axios(endpoint, {
            method: "GET",
        });
        return res.data;
    } catch (error: any) {
        returnToHome(error);
    }
}

export const getPostBySlug = async (slug: string[] | string): Promise<AxiosResponse | any> => {
    try {
        const endpoint = `/admin/get-one-post/${slug}`;
        const res = await custom_axios(endpoint, {
            method: "GET",
        });
        return res.data;
    } catch (error: any) {
        returnToHome(error);
    }
}
