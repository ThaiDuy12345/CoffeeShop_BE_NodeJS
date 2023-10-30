import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import fs from "fs";
import admin from "firebase-admin";
import credential from "../environments/coffee-shop-project-f6ca3-firebase-adminsdk-fhrfp-b069fb1810.js";
const firebaseConfig = {
  apiKey: "AIzaSyCAZ-8faDUSDw9Krd9hCaK5rhPgDI2EcSk",
  authDomain: "coffee-shop-project-f6ca3.firebaseapp.com",
  databaseURL:
    "https://coffee-shop-project-f6ca3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coffee-shop-project-f6ca3",
  storageBucket: "coffee-shop-project-f6ca3.appspot.com",
  messagingSenderId: "124592920764",
  appId: "1:124592920764:web:aebb399b66ba3a8fe398b9",
  measurementId: "G-JYTD2FPXLG",
  credential: admin.credential.cert(credential as admin.ServiceAccount),
};

const app = getStorage(initializeApp(firebaseConfig));

export const upload = async (
  file: Express.Multer.File,
  desination: "banners" | "images"
): Promise<void> => {
  try {
    const tempFilePath = `../src/src/temp/${file.originalname}`;
    
    // Liệt kê tất cả các tệp trong thư mục
    fs.readdir("../src/src", (error, files) => {
      if (error) {
        console.error('Lỗi khi đọc thư mục:', error);
      } else {
        console.log('Danh sách các tệp trong thư mục src:');
        files.forEach((file) => {
          console.log(file);
        });
      }
    });

    // Liệt kê tất cả các tệp trong thư mục
    fs.readdir("../src/src/temp", (error, files) => {
      if (error) {
        console.error('Lỗi khi đọc thư mục:', error);
      } else {
        console.log('Danh sách các tệp trong thư mục temp:');
        files.forEach((file) => {
          console.log(file);
        });
      }
    });
    
    fs.writeFileSync(tempFilePath, file.buffer);
    await app.bucket().upload(tempFilePath, {
      destination: `${desination}/${file.originalname}`,
      metadata: {
        contentType: file.mimetype,
      },
    });

    fs.unlink(tempFilePath, (error) => {
      if (error) {
        console.error("Lỗi khi xóa tệp tạm thời:", error);
      } else {
        console.log("Tệp tạm đã được xóa.");
      }
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const get = async (
  fileName: string,
  desination: "banners" | "images"
): Promise<any> => {
  return await app
    .bucket()
    .file(`${desination}/${fileName}`)
    .getSignedUrl({
      action: "read",
      expires: new Date("12-31-3000"), // Điều này đảm bảo URL không hết hạn
    });
};

export const getAll = async (
  desination: "banners" | "images"
): Promise<String[]> => {
  const files = await app.bucket().getFiles({
    prefix: `${desination}/`,
  });

  const fileList = files[0]
    .filter((file) => {
      return !file.name.endsWith("/");
    })
    .map((file) => {
      return file.name;
    });

  return fileList;
};

export const resetBanner = async (fileName: string): Promise<any> => {
  try {
    const defaultPath = `../src/src/assets/${fileName}`;

    await app.bucket().upload(defaultPath, {
      destination: `banners/${fileName}`,
      metadata: {
        contentType: "image/png",
      },
    });
  } catch (err) {
    console.log(err);
  }
};
