import { AxiosResponse } from "axios";
import { custom_axios } from "./custom_axios";
import alertify from "../notifications/toast/alert_service";
import { CommentsTypes, Votes } from "../types/types";

export const returnToHome = (error: any) => {
    if (error.response.status >= 400 && error.response.status !== 401) return alertify.error(error.response.data.error);
    if (error.response.status === 401) alertify.error(error.response.data.error);
    setTimeout(() => {
        window.location.href = "/";
    }, 2000);
}
export const uploadContentImagesService = async (
    data: FormData
): Promise<AxiosResponse | any> => {
    try {
        const endpoint = "/articles/upload-content-images";
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
        const endpoint = "/articles/create-post";
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

export const updateContent = async (data: FormData): Promise<void | any> => {
    try {
        const endpoint = "/articles/update-post";
        const res = await custom_axios.post(endpoint, data,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                },
            });
        if (res.status === 200) alertify.success(res.data.message);
    } catch (error: any) {
        returnToHome(error);
    }
}

export const getPreviewPosts = async (): Promise<AxiosResponse | any> => {
    try {
        const endpoint = "/articles/get-preview-posts";
        const res = await custom_axios(endpoint, {
            method: "GET",
        });
        return res.data;
    } catch (error: any) {
        returnToHome(error);
    }
}

export const getPostBySlug = async (slug: string): Promise<AxiosResponse | any> => {
    try {
        const endpoint = `/articles/get-one-post/${slug}`;
        const res = await custom_axios(endpoint, {
            method: "GET",
        });
        return res.data;
    } catch (error: any) {
        returnToHome(error);
    }
}

export const removePostBySlug = async (slug: string[] | string): Promise<AxiosResponse | any> => {
    try {
        const endpoint = `/articles/delete-post/${slug}`;
        const res = await custom_axios(endpoint, {
            method: "DELETE",
        });
        if (res.status === 200) alertify.success(res.data.message);
    } catch (error: any) {
        returnToHome(error);
    }
}

export const postReaction = async (data: Votes): Promise<AxiosResponse | any> => {
    try {
        const endpoint = "/article-reactions/post-reaction";
        const res = await custom_axios(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            data: JSON.stringify(data),
        });
        switch (res.status) {
            case 201:
                alertify.success(res.data.message);
                break;
            case 200:
                alertify.success(res.data.info);
                break;
            default:
                break;
        }
        return res.status;
    } catch (error: any) {
        if (error.response.status === 401) return alertify.info("Debes registrarte para votar")
    }
}

export const getPostReactions = async (slug: string): Promise<AxiosResponse | any> => {
    try {
        const endpoint = `/article-reactions/get-reactions/${slug}`;
        const res = await custom_axios(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        return res.data.results;
    } catch (error: any) {
        returnToHome(error);
    }
}

export const uploadComments = async (data: CommentsTypes): Promise<void | any> => {
    try {
        const endpoint = "/article-reactions/create-comment";
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
        console.log(error);
    }
}

export const getComments = async (slug: string): Promise<AxiosResponse | any> => {
    try {
        const endpoint = `/articles/get-comments/${slug}`;
        const res = await custom_axios(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        console.log(error);
    }
}

export const removeComment = async (id: string): Promise<void | any> => {
    try {
        const endpoint = `/article-reactions/remove-comment`;
        const res = await custom_axios(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            data: JSON.stringify({ id }),
        });
        console.log(res);
        if (res.status === 200) alertify.success(res.data.message);
    } catch (error: any) {
        console.log(error);
    }
}