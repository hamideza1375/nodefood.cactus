var fs = require('fs');
const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-path");
const { FoodModel } = require('../model/FoodModel');
const UserModel = require('../model/UserModel');
const NotifeeModel = require('../model/NotifeeModel');
const { FoodSchema, ChildFoodSchema, NotifeeSchema } = require('../validator/AdminSchema');
const AddressModel = require('../model/AddressModel');
const proposalModel = require('../model/proposalModel');


function AdminController() {

  this.createFood = async (req, res) => {
      await FoodSchema.validate(req.body)
      if (!req.files) return res.status(400).json('err')
      const image = req.files.imageUrl;
      const fileName = `${shortId.generate()}_${image.name}`;
      await sharp(image.data).toFile(`${appRoot}/public/upload/food/${fileName}`)
      const food = await new FoodModel({ title: req.body.title, imageUrl: fileName }).save();
      res.status(200).json({ food })
  }


  this.editFood = async (req, res) => {
      await FoodSchema.validate(req.body)
      const food = await FoodModel.findById(req.params.id);
      const { title } = req.body
      let fileName = ""
      if (req.files) {
        const image = req.files.imageUrl;
        fileName = `${shortId.generate()}_${image.name}`;
        await sharp(image.data).toFile(`${appRoot}/public/upload/food/${fileName}`)
        if (fs.existsSync(`${appRoot}/public/upload/food/${food.imageUrl}`))
          fs.unlinkSync(`${appRoot}/public/upload/food/${food.imageUrl}`)
      } else fileName = food.imageUrl
      food.title = title;
      food.imageUrl = fileName;
      await food.save();
      res.status(200).json({ food })
  }


  this.deleteFood = async (req, res) => {
      const food = await FoodModel.findById(req.params.id);
      await FoodModel.findByIdAndRemove(req.params.id)
      if (fs.existsSync(`${appRoot}/public/upload/food/${food.imageUrl}`))
        fs.unlinkSync(`${appRoot}/public/upload/food/${food.imageUrl}`)
      res.status(200).json({ food });
  }


  this.createChildFood = async (req, res) => {
      await ChildFoodSchema.validate(req.body)
      const food = await FoodModel.findById({ _id: req.params.id })
      const { title, price, info } = req.body
      if (!req.files) return res.status(400).json('err')
      const image = req.files.imageUrl;
      const fileName = `${shortId.generate()}_${image.name}`;
      await sharp(image.data).toFile(`${appRoot}/public/upload/food/${fileName}`)
      food.childFood.push({
        title, price, info, imageUrl: fileName, commentId: req.params.id,
        refId: req.params.id
      });
      food.save()
      res.status(200).json(food.childFood)
  }


  this.editChildFood = async (req, res) => {
      await ChildFoodSchema.validate(req.body)
      const food = await FoodModel.findById({ _id: req.params.id })
      const child = food.childFood.find((f) => f._id == req.query.id)
      const { title, price, info } = req.body
      let fileName = ""
      if (req.files) {
        const image = req.files.imageUrl;
        fileName = `${shortId.generate()}_${image.name}`;
        await sharp(image.data).toFile(`${appRoot}/public/upload/food/${fileName}`)
        if (fs.existsSync(`${appRoot}/public/upload/food/${child.imageUrl}`))
          fs.unlinkSync(`${appRoot}/public/upload/food/${child.imageUrl}`)
      } else fileName = child.imageUrl
      child.title = title;
      child.price = price;
      child.info = info;
      child.imageUrl = fileName;
      await food.save();
      res.status(200).json({ childFood: child })
  }


  this.deleteChildFood = async (req, res) => {
      const food = await FoodModel.findById({ _id: req.params.id })
      const child = food.childFood.find((f) => f._id == req.query.id)
      const delChild = food.childFood.filter((f) => f._id != req.query.id)
      food.childFood = delChild
      food.save()
      if (fs.existsSync(`${appRoot}/public/upload/${child.imageUrl}`))
        fs.unlinkSync(`${appRoot}/public/upload/${child.imageUrl}`)

      res.status(200).json('');
  }


  this.getAllAddress = async (req, res) => {
      const allAddress = await AddressModel.find().sort({ createdAt: -1 });
      if (req.user && req.user.payload.isAdmin) return res.json(allAddress)
      else return res.json([])
  }


  this.deleteAddress = async (req, res) => {
      let address = await AddressModel.findOne({ _id: req.params.id })
      if (!address) return res.status(400).send('err')
      address.del = req.user.payload.userId
      address.save()
      res.json("del")
  }


  this.deleteAllAddress = async (req, res) => {
      await AddressModel.deleteMany()
      res.json("del")
  }


  this.createNotification = async (req, res) => {
      await NotifeeSchema.validate(req.body)
      await NotifeeModel.deleteMany()
      await new NotifeeModel({ title: req.body.title, message: req.body.message }).save()
      setTimeout(async () => { await NotifeeModel.deleteMany() }, 60000 * 60 * 12 * 2)
      res.json('good')
  }


  this.unAvailable = async (req, res) => {
      const food = await FoodModel.findById({ _id: req.params.id })
      if (!food) return res.status(400).send('err')
      let fd = food.childFood.find((f) => (f._id == req.query._id))
      fd.available = req.body.available
      food.save()
      console.log(fd.available)
      res.status(200).json(!fd.available)
  }


  this.listAvailable = async (req, res) => {
      const food = await FoodModel.find()
      let fd = ''
      let fd2 = []
      food.forEach((f1) => {
        fd = f1.childFood.filter((f) => (f.available == false))
        fd.forEach((f2) => { fd2.push(f2) })
      })
      console.log(fd2)
      res.status(200).json(fd2)
  }


  this.setUserAdmin = async (req, res) => {
      const user = await UserModel.findOne({ phone: req.body.phone });
      if (!user) return res.status(400).json('err');
      if (user.isAdmin === 'chief') return res.status(400).json('err');
      user.isAdmin = 'courier';
      await user.save();
      res.status(200).json('good');
  }


  this.deleteAdmin = async (req, res) => {
      const user = await UserModel.findOne({ phone: req.body.phone });
      if (!user) return res.status(400).json('err');
      if (user.isAdmin === 'chief') return res.status(400).json('err');
      if (user.isAdmin !== 'courier') return res.status(400).json('err');
      user.isAdmin = '';
      await user.save();
      res.status(200).json('good');
  }


  this.changeAdmin = async (req, res) => {
      const userAdmin = await UserModel.findOne({ phone: req.body.adminPhone });
      const newAdminPhone = await UserModel.findOne({ phone: req.body.newAdminPhone });
      if (!newAdminPhone || !userAdmin) return res.status(400).json('err');
      if (req.body.adminPhone === req.body.newAdminPhone || userAdmin.isAdmin !== 'chief') return res.status(400).json('err');
      userAdmin.isAdmin = '';
      newAdminPhone.isAdmin = 'chief';
      await userAdmin.save();
      await newAdminPhone.save();
      res.status(200).json('good');
  }


  this.allUserAdmin = async (req, res) => {
      const user = await UserModel.find();
      const userAdmin = user.filter((user) => user.isAdmin === 'courier')
      console.log('user', userAdmin);
      res.status(200).json(userAdmin);
  }


  this.getProposal = async (req, res) => {
    const allProposal = await proposalModel.find();
    res.send(allProposal)
  }


  this.deleteMultiProposal = async (req, res) => {
    let id = JSON.parse(req.query.allId)
    for (let i of id) {
      await proposalModel.deleteMany({ _id: i })
    }
    if(id.length){
      res.send('good') 
    }
    else res.status(395).send('err') 
  }

}


module.exports = new AdminController();