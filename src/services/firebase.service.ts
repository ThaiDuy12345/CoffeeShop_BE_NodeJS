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
  destination: "banners" | "images"
): Promise<void> => {
  try {
    deleteOld(file.originalname, destination)
    const fileName = newNameGenerator(file.originalname)
    const tempFilePath = `../src/src/temp/${fileName}`;

    fs.writeFileSync(tempFilePath, file.buffer);

    await app.bucket().upload(tempFilePath, {
      destination: `${destination}/${fileName}`,
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
  const files = await app.bucket().getFiles({
    prefix: `${desination}/`,
  });

  const file = files[0]
    .find((file) => {
      return !file.name.endsWith("/") && file.name.includes(fileName)
    })

  if(!file) return null
  return await app
    .bucket()
    .file(`${file.name}`)
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

const deleteOld = async (fileName: string, destination: "banners" | "images"): Promise<any> => {
  const files = await app.bucket().getFiles({
    prefix: `${destination}/`,
  });
  files[0].forEach(async (f: any) => {
    if(!(!f.name.endsWith("/") && f.name.includes(fileName))) return
    await app.bucket().file(f.name).delete()
  })
}
const newNameGenerator = (fileName: string): string => `${fileName}_${new Date().getTime()}.png` 

export const resetBanner = async (fileName: string): Promise<any> => {
  try {
    deleteOld(fileName, "banners")
    //path ../src/src/
    //local path src/
    const defaultPath = `../src/src/assets/${fileName}.png`;
    await app.bucket().upload(defaultPath, {
      destination: `banners/${newNameGenerator(fileName)}`,
      metadata: {
        contentType: "image/png",
      },
    });
  } catch (err) {
    console.log(err);
  }
};
