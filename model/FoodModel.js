const mongoose = require('mongoose');


const CommenteModel = new mongoose.Schema({
    starId: { type: mongoose.Schema.Types.ObjectId, ref: "starId" },
    fullname:String,
    imageUrl:{ type: String, default: '' },
    message: { type: String, required: true },
    allstar: { type: Number, required: 1  },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "food" }
});



const ChildFoodModel = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    info: { type: String, required: true },
    imageUrl: { type: String, required: true },
    meanStar: { type: Number, required: true, default: 0 },
    num: { type: Number, default:0 },
    total: { type: Number, default:0 },
    available: { type: Boolean, default:true },
    comment: [CommenteModel],
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "food" },
    refId: { type: mongoose.Schema.Types.ObjectId, ref: "foodId" }
});




const FoodModel = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    num: { type: Number },
    price: { type: Number, default:0 },
    childFood: [ChildFoodModel],
    // userId: { type: mongoose.Schema.Types.ObjectId, default: req.user.payload._id, ref: "userId"}
});


exports.FoodModel = mongoose.model("Food", FoodModel);

















// const DrinkModel = new mongoose.Schema({
//     title: { type: String, required: true },
//     price: { type: Number, required: true },
//     info: { type: String, required: true },
//     imageUrl: { type: String, required: true },
//     num: { type: Number },
//     comment: [CommenteModel],
//     commentId: { type: mongoose.Schema.Types.ObjectId, ref: "food3" }

// });

// exports.DrinkModel = mongoose.model("drink", DrinkModel);




// const SandwichModel = new mongoose.Schema({
//     title: { type: String, required: true },
//     price: { type: Number, required: true },
//     info: { type: String, required: true },
//     imageUrl: { type: String, required: true },
//     num: { type: Number },
//     comment: [CommenteModel],
//     commentId: { type: mongoose.Schema.Types.ObjectId, ref: "food2" }

// });

// exports.SandwichModel = mongoose.model("sandwich", SandwichModel);