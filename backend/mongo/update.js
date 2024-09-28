import foodModel, { adminModel, catogeryModel, corporateModel, faqModel, PackagesModel, PartnersModel, ServicesModel } from "./schema.js";

export const updateFood = (
  id,
  name,
  description,
  price,
  image,
  rating,
  isVeg,
  catogery,
  isPopular
) => {
  return foodModel.findOneAndUpdate(
    { _id: id },
    { name, description, price, image, rating, isVeg, catogery, isPopular },
    { new: true }
  );
};

export const updateUser = async (id, name, email, password, role) => {
  return adminModel.findByIdAndUpdate({ _id: id }, { name: name, email: email, password: password, role: role});
};

export async function updateUserFoodPlate(userId, plateId, action) {
  try {
    const existingPlate = await userFoodPlatesModel.findOne({ userId });

    if (existingPlate) {
      if (action === "remove") {
        existingPlate.plates = existingPlate.plates.filter(
          (item) => item.id !== plateId
        );
      } else {
        const plateItem = existingPlate.plates.find(
          (item) => item.id === plateId
        );

        if (plateItem) {
          if (action === "increment") {
            plateItem.quantity = (plateItem.quantity || 0) + 1;
          } else if (action === "decrement") {
            if (plateItem.quantity > 1) {
              plateItem.quantity -= 1;
            }
          } else {
            return { status: 400, message: "Invalid action" };
          }
        } else {
          return { status: 404, message: "Food plate item not found" };
        }
      }

      await existingPlate.save();

      return { status: 200, message: "Food plate updated successfully" };
    } else {
      return { status: 404, message: "No plates found for this user" };
    }
  } catch (e) {
    console.error("Error updating food plate:", e);
    return { status: 500, message: "Internal server error" };
  }
}



export const updateCorporate = async (
  id,
  title,
  description,
  image,
  actualPrice,
  discountedPrice,
  catogery,
  tags,
  items,
) => {
  return corporateModel.findByIdAndUpdate({ _id: id }, { title: title, description: description, image: image, discountedPrice: discountedPrice, actualPrice: actualPrice, catogery: catogery, tags: tags, items: items});
};

export const updatePackage = async (
  id,
  title,
  description,
  image,
  catogery,
  items,
  tags
) => {
  return PackagesModel.findByIdAndUpdate({_id: id}, {title: title, description: description, image: image, catogery: catogery, items: items, tags: tags})
}

export const updatePartners = async (id, image, name) => {
  return PartnersModel.findByIdAndUpdate({ _id: id }, { image: image, name: name});
}

export const updateServices = async (id, image, name) => {
  return ServicesModel.findByIdAndUpdate({ _id: id }, { image: image, name: name});
}

export const updateFaq = async (id, question, answer, catogery) => {
  return faqModel.findByIdAndUpdate({ _id: id }, { question: question, answer: answer, catogery: catogery});
}

export const UpdateCategory = async (id, name, image) => {
  return catogeryModel.findByIdAndUpdate({_id: id}, {name: name}, {image: image});
}