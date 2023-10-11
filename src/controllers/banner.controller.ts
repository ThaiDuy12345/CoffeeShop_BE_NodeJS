import express from 'express';
import mongoose from 'mongoose';
import BannerModel from '../models/banner.model.js';
import { ObjectId } from 'mongodb';
export const index = async (req: express.Request, res: express.Response) => {
  const banners = await BannerModel.find()
  res.status(200).json({
    status: 200,
    data: banners
  })
}

export const show = async (req: express.Request, res: express.Response) => {
  try{
    if(!(req.params.id)) throw { code: 400, message: 'Id is missing' }
    const banner = await BannerModel.findById(req.params.id).populate('image')
    res.status(200).json({
      status: 200,
      data: banner
    })
  }catch (err: any){
    res.status(err.code || 500).json({
      status: err.code || 500,
      messsage: err.message
    })
  }
}
//main - 65243a5c03b0401f307211a0
//pop_up - 65243cdd7b2bd52ca2bb1037
export const create = async (req: express.Request, res: express.Response) => {
  try{
    if(!(req.body.image_id && req.body.image_type)) throw { code: 400, message: "Id or type is missing"}
    
    const banner = await new BannerModel({
      type: req.body.image_type,
      image: req.body.image_id
    }).save()

    const populate_banner = await BannerModel.findById(banner.id).populate('image')

    res.status(200).json({
      status: 200,
      data: populate_banner
    })
  }catch (err: any){
    res.status(err.code || 500).json({
      status: err.code || 500,
      messsage: err.message
    })
  }
}

export const update = async (req: express.Request, res: express.Response) => {
  try{
    if(!(req.params.id)) throw { code: 400, message: "Banner's Id or Id is missing"}
    
    const banner = await BannerModel.findById({
      _id: req.params.id
    })

    if(!banner) throw { message: "The banner Id not exists"}
    console.log(req.body.image_id)
    if(req.body.image_id){
      banner.image = new mongoose.Types.ObjectId(req.body.image_id) 
    }else{
      banner.image = 
        banner.type === "main" ? 
          new mongoose.Types.ObjectId("6526ac20a0ba131d9425a158")
            : 
          new mongoose.Types.ObjectId("6526afd16f619f69e8389e92")
    }
      
    await banner.save()

    const populate_banner = await BannerModel.findById(banner.id).populate('image')

    res.status(200).json({
      status: 200,
      data: populate_banner
    })
    
  }catch (err: any){
    res.status(err.code || 500).json({
      status: err.code || 500,
      messsage: err.message
    })
  }
}
