import { v2 as cloudinary } from 'cloudinary';
const cloudinaryConnection = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME, // Your Cloudinary cloud name
        api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API key
        api_secret: process.env.CLOUDINARY_SECRETE_KEY,  // Your Cloudinary API secret
    });
    console.log("Cloudinary configured successfully");
};
export default cloudinaryConnection;
