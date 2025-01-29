import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const UrlImage = (req,base64String, category) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
    
        const imagesDir = path.join(__dirname, `../../public/images/${category}`);
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }

        const fileName = `image-${Date.now()}.jpeg`;
        const filePath = path.join(imagesDir, fileName);

        const matches = base64String.match(/^data:(.+);base64,(.+)$/);
     
        if (!matches || matches.length !== 3) {
            return res.status(400).json({ message: 'Invalid base64 string format' });
        }

        const mimeType = matches[1];  // Extract mime type (image/jpeg, image/png, etc.)
        const imageData = matches[2]; // Extract the actual base64 encoded image data
           
        fs.writeFileSync(filePath, Buffer.from(imageData, 'base64'));
        const imageUrl = `${req.protocol}://${req.get('host')}/public/images/${category}/${fileName}`;
       
        return imageUrl
    } catch (error) {
        fs.unlinkSync(localFilePath)

    }
}

export {
    UrlImage
}