import foodModel, { corporateModel, orderModel } from "./schema.js";
import { adminModel, catogeryModel } from "./schema.js";

export const readFood = async (catogery) => {
  const data = await foodModel.find({catogery: catogery});
  return data;
};

export const readAllFoods = async () => {
  const data = await foodModel.find();
  return data;
}
export const readById = async (endpoint, id) => {
  if (endpoint === "Foods") {
    const data = await foodModel.findById(id);
    return data;
  }
  if (endpoint === "Admins") {
    const data = await adminModel.findById(id);
    return data;
  }
};

export const readUsers = async (id) => {
  const data = await adminModel.findById(id);
  return data;
};

export const readAdmins = async () => {
  const data = await adminModel.find();
  return data;
};

export const readOrders = async () => {
  const data = await orderModel.find();
  return data;
};
// export const readUserOrdersById = async (userId) => {
//   const data = await foodOrdersModel.findOne({ userId });
//   return data;
// };


export const readCatogery = async () => {
  const data = await catogeryModel.find()
  return data;
}


export const readCorporate = async () => {
  const data = await corporateModel.find({})
  .select({
    title: 1,
    description: 1,
    image: { $slice: 1 }, // Get only the first element of the image array
    actualPrice: 1,
    discountedPrice: 1,
    isVeg: 1,
    _id: 1 // Exclude _id
  });

  return data;
}
export const readDetailsCorporate = async (id) => {
  const data = await corporateModel.find({_id: id});
  return data;
}
export const readAllCorporate = async () => {
  const data = await corporateModel.find();
  return data;
}