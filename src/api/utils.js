import axios from 'axios'

export const uploadImageToServer = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const image_hosting_key = import.meta.env.VITE_ImgApiKey;

    try {
        const { data } =
            await axios.post(`https://api.imgbb.com/1/upload?key=${image_hosting_key}`, formData);
        console.log("img data", data.data.display_url)
        return data.data.display_url
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};
