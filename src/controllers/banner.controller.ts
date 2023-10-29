import express from 'express';
import { upload, get, getAll, resetBanner } from "../services/firebase.service.js"
export const index = async (req: express.Request, res: express.Response) => {
  try{
    res.status(200).json({
      status: true,
      data: await getAll("banners")
    })
  }catch(err: any){
    res.status(400).json({
      status: 400,
      message: err.message
    })
  }
}

export const show = async (req: express.Request, res: express.Response) => {
  try{
    if(!["main", "pop_up"].includes(req.params.type)) throw { code: 400, message: 'Banner type is missing or undefined' }

    const fileName = req.params.type === "main" ? "bannerMain.png" : "bannerPopUp.png"

    res.status(200).json({
      status: true,
      data: {
        name: fileName,
        url: await get(fileName, "banners")
      }
    })
  }catch (err: any){
    res.status(err.code || 500).json({
      status: false,
      messsage: err.message
    })
  }
}

export const reset = async (req: express.Request, res: express.Response) => {
  try{
    if(!["main", "pop_up"].includes(req.params.type)) throw { code: 400, message: 'Banner type is missing or undefined' }

    const fileName = req.params.type === "main" ? "bannerMain.png" : "bannerPopUp.png"
    await resetBanner(fileName)

    res.status(200).json({
      status: true,
      data: {
        name: fileName,
        url: await get(fileName, "banners")
      }
    })
  }catch(err: any){
    res.status(err.code || 500).json({
      status: false,
      messsage: err.message
    })
  }
  
}

export const create = async (req: express.Request, res: express.Response) => {
  try{
    if(!(req.params.type && req.file)) throw { code: 400, message: "Type or file is missing"}
    const image: Express.Multer.File = req.file

    image.originalname = req.params.type === "main" ? "bannerMain.png" : "bannerPopUp.png"
    image.mimetype = "image/png"

    await upload(image, "banners")
    
    res.status(200).json({  
      status: true,
      data: {
        name: image.originalname,
        url: await get(image.originalname, "banners")
      }
    })
  }catch (err: any){
    res.status(err.code || 500).json({
      status: false,
      messsage: err.message
    })
  }
}
