import express from 'express';
import ImageModel from "../models/image.model.js"

export const index = async (req: express.Request, res: express.Response) => {
  const images = await ImageModel.find()
  res.json({
    status: res.statusCode,
    data: images
  })
}

export const show = async (req: express.Request, res: express.Response) => {
  try{
    const id = req.params.id
    const images = await ImageModel.findById(id)
    res.json({
      status: res.statusCode,
      data: images
    })
  }catch(err: any){
    res.json({
      status: 400,
      message: err.message
    })
  }
  
}

export const destroy = async (req: express.Request, res: express.Response) => {

}

export const create = async (req: express.Request, res: express.Response) => {
  try{
    
  }catch(err: any){
    res.json({
      status: 400,
      message: err.message
    })
  }
}