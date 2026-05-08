import api from "./client";

export const getTags = () => {
    return api.get("/tags");
};

export const createTag = (data) => {
    return api.post("/tags", data);
};

export const updateTag = (id, data) => {
    return api.put(`/tags/${id}`, data);
};

export const deleteTag = (id) => {
    return api.delete(`/tags/${id}`);
};
