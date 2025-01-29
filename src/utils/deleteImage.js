import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';



const deleteImage = async (category, categoryName) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);


        
        const imagesDir = path.join(__dirname, `../../public/images/${categoryName}`);
        const oldImagePath = category.image_url
        console.log(oldImagePath);
        const parsedUrl = new URL(oldImagePath);
        const fileName = path.basename(parsedUrl.pathname);
        const filePath = path.join(imagesDir, fileName);
      

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting the file:', err);
                
            }
            console.log('File deleted successfully');
        });

        return


    } catch (error) {
        console.log(`something went wronge whenever delete Image: ${error.message}`);

    }
}

export { deleteImage }