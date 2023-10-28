import express from 'express';
import ImageModel from "../models/image.model.js"

export const index = async (req: express.Request, res: express.Response) => {
  const images = (await ImageModel.find()).map(image => image._id)
  res.status(200).json({
    status: 200,
    data: images
  })
}

export const show = async (req: express.Request, res: express.Response) => {
  try{
    const id = req.params.id
    const image = await ImageModel.findById(id)
    if(!image) throw { code: 404, message: `${id} not found!!` }
    res.status(200).json({
      status: 200,
      data: image
    })
  }catch(err: any){
    res.status(err.code || 500).json({
      status: err.code || 500,
      message: err.message
    })
  }
  
}

export const destroy = async (req: express.Request, res: express.Response) => {
  try{
    if(['6526ac20a0ba131d9425a158', '6526afd16f619f69e8389e92'].includes(req.params.id)){
      throw { code: 400, message: "Cannot delete the default values" }
    }
    await ImageModel.deleteOne({ _id: req.params.id })
    res.status(200).json({
      status: 200,
      message: "Successfully deleted",
    })
  }catch(err: any){
    res.status(err.code).json({
      status: err.code,
      message: err.message,
    })
  }
  
}

export const create = async (req: express.Request, res: express.Response) => {
  try{
    if(!(req.file)) throw { code: 400, message: "File is missing!!" }

    const base64 = req.file.buffer.toString('base64')
    
    const image = await new ImageModel({
      url: base64
    }).save()

    res.status(200).json({
      status: 200,
      data: image,
    })

  }catch(err: any){
    res.status(err.code || 500).json({
      status: err.code || 500,
      message: err.message
    })
  }
}