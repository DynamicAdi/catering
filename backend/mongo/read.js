import foodModel, { corporateModel, faqModel, OrderCorporateModel, orderModel, PackageOrderModel, PackagesModel, PartnersModel, ServicesModel } from "./schema.js";
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
  if (endpoint === "Services") {
    const data = await ServicesModel.findById(id);
    return data;
  }
  if (endpoint === "Clients") {
    const data = await PartnersModel.findById(id);
    return data;
  }
  if (endpoint === "Faq") {
    const data = await faqModel.findById(id);
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

export const readCorporateOrders = async () => {
  const data = await OrderCorporateModel.find()
  return data;
}

export const readPackages = async () => {
  const data = await PackageOrderModel.find()
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
    catogery: 1,
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

export const readPartners = async () => {
  const data = await PartnersModel.find();
  return data;
}

export const readServices = async () => {
  const data = await ServicesModel.find();
  return data;
}

export const readFaq = async () => {
  const data = await faqModel.find();
  return data;
}

export const getPackages = async () => {
  const data = await PackagesModel.find();
  return data;
}