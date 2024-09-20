import foodModel, { adminModel, corporateModel, faqModel, PartnersModel, ServicesModel } from "./schema.js";

export async function deleteFood(foodId) {
  return await foodModel.deleteOne({ _id: foodId });
}

export async function deleteData(endpoint, id) {
  if (endpoint === "Foods") {
    return await foodModel.deleteOne({ _id: id });
  }
  if (endpoint === "Admins") {
    return await adminModel.deleteOne({ _id: id });
  }
  if (endpoint === "Corporate") {
    return await corporateModel.deleteOne({ _id: id });
  }
  if (endpoint === "Popular") {
    return await foodModel.findByIdAndUpdate({ _id: id }, { isPopular: false });
  }
  if (endpoint === "Services") {
    return await ServicesModel.deleteOne({ _id: id });
  }
  if (endpoint === "Clients") {
    return await PartnersModel.deleteOne({ _id: id });
  }
  if (endpoint === "Faq") {
    return await faqModel.deleteOne({ _id: id });
  }
}

export async function removeUserFoodPlate(userId) {
  try {
    const existingPlate = await userFoodPlatesModel.findOne({ userId });

    if (existingPlate) {
      existingPlate.plates = [];
      await existingPlate.save();

      return { status: 200 };
    } else {
      return { status: 404, message: "No plates found for this user" };
    }
  } catch (e) {
    console.error("Error removing food plate:", e);
    return { status: 500 };
  }
}

export const removeCorporate = async (id) => {
  return await corporateModel.deleteOne({ _id: id });
}

export const removePartners = async (id) => {
  return await PartnersModel.deleteOne({ _id: id });
}


export const removeServices = async (id) => {
  return await ServicesModel.deleteOne({ _id: id });
}

export const removeFaq = async (id) => {
  return await faqModel.deleteOne({ _id: id });
}