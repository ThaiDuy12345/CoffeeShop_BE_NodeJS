import express from 'express';
import { get, upload, getAll } from "../services/firebase.service.js"
export const index = async (req: express.Request, res: express.Response) => {
  try{
    res.status(200).json({
      status: true,
      url: await getAll("images")
    })
  }catch(err: any){
    res.status(err.code || 500).json({
      status: false,
      message: err.message
    })
  }
}

export const show = async (req: express.Request, res: express.Response) => {
  try{
    if(!req.params.id) throw { code: 400, message: 'Id is missing or undefined' }
    const fileName = `product_${req.params.id}`
    const result = await get(fileName, "images")
    res.status(200).json({
      status: true,
      data: {
        name: fileName,
        url: result ? result[0] : null
      }
    })
  }catch(err: any){
    res.status(err.code || 500).json({
      status: false,
      message: err.message
    })
  }
}

export const create = async (req: express.Request, res: express.Response) => {
  try{
    if(!(req.file && req.params.id)) throw { code: 400, message: "File or id is missing!!" }
    
    const image = req.file
    image.originalname = `product_${req.params.id}`
    image.mimetype = "image/png"

    await upload(image, "images")

    const result = await get(image.originalname, "images")

    res.status(200).json({  
      status: true,
      data: {
        name: image.originalname,
        url: result ? result[0] : null
      }
    })

  }catch(err: any){
    res.status(err.code || 500).json({
      status: false,
      message: err.message
    })
  }
}