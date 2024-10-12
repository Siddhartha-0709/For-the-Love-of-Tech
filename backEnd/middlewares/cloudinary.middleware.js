import {v2 as cloudinary} from 'cloudinary';
import path from 'path';
import fs from 'fs';
cloudinary.config({ 
  cloud_name: 'djf6ew5uc', 
  api_key: '224572857724586', 
  api_secret: 'bb_dvWvyFeVeTsnrNg3m8kZz1Zo' 
});

const uploadOnCloudinary = async(localFilePath)=>{
    try{
        localFilePath = path.normalize(localFilePath);
        console.log('File Path:', localFilePath);
        
        if(!localFilePath){
            return null;
        }
        //upload file on cloudinary
        console.log("Uploading file on Cloudinary");
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "spaces",
        })
        //file is uploaded successfully
        console.log("File is Uploaded on Cloudinary", response.secure_url);
        if(!response.secure_url){
            throw new Error("File not uploaded on Cloudinary");
        }
        fs.unlinkSync(localFilePath);
        return response.secure_url;
    }
    catch(error){
        fs.unlinkSync(localFilePath); //Remove the locally saved temporary file as the upload operation failed
    }
}

export default uploadOnCloudinary