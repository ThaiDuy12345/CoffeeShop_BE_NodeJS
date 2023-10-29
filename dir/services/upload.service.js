import fs from "fs";
import firebaseStorage from "../services/firebase.service.js";
export const upload = async (file, desination) => {
    const tempFilePath = `src/temp/${file.originalname}`;
    fs.writeFileSync(tempFilePath, file.buffer);
    await firebaseStorage.bucket().upload(tempFilePath, {
        destination: `${desination}/${file.originalname}`,
        metadata: {
            contentType: file.mimetype
        }
    });
    fs.unlink(tempFilePath, (error) => {
        if (error) {
            console.error('Lỗi khi xóa tệp tạm thời:', error);
        }
        else {
            console.log('Tệp tạm đã được xóa.');
        }
    });
};
//# sourceMappingURL=upload.service.js.map