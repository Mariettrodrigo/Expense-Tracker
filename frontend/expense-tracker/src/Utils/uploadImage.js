import { API_PATHS } from "./ApiPaths";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    //Append image file to form data
    formData.append('image', imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                //override content-type to multipart/form-data for this request only
                'Content-Type':'multipart/form-data', },
            });
        
        
        return response.data; //return response data
    } catch (error) {
        console.error('Error Uploading the image:', error);
        throw error; //Rethrow error for handling
    }
};

export default uploadImage;