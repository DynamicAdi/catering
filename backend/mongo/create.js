import foodModel, {
  // foodOrdersModel,
  catogeryModel,
  orderModel,
  adminModel,
  corporateModel,
  PartnersModel,
  ServicesModel,
  faqModel,
  PackagesModel,
  OrderCorporateModel,
  PackageOrderModel
} from "./schema.js";
export async function CreateFood(
  name,
  description,
  price,
  image,
  rating,
  isVeg,
  catogery
) {
  try {
    const foods = new foodModel({
      name: name,
      description: description,
      price: price,
      image: image,
      rating: rating,
      isVeg: isVeg,
      catogery: catogery,
    });
    await foods.save();
  } catch (e) {
    console.log("error" + e);
  }
}

export const createOrders = async (
  name,
  email,
  phone,
  address,
  date,
  note,
  functionType,
  noOfPeople,
  foodPreference,
  items
) => {
  try {
    const order = new orderModel({
      name,
      email,
      phone,
      address,
      date,
      note,
      functionType,
      noOfPeople,
      foodPreference,
      items,
    });
    await order.save();
  } catch (e) {
    console.log("error" + e);
  }
};

export const orderPackages = async function(
  item,
  name,
  email,
  phone,
  address,
  date,
  customize
) {
  try {
    const result = new PackageOrderModel({
      OrderedItem: item,
      name: name,
      email: email,
      phone: phone,
      address: address,
      date: date,
      customize: customize,
    })
    await result.save();
  }
  catch (e) {
    console.log("error" + e);
  }
}

export const orderCorporate = async function(
  item,
  name,
  email,
  phone,
  address,
  date,
) {
  try {
    const result = new OrderCorporateModel({
      OrderedItem: item,
      name: name,
      email: email,
      phone: phone,
      address: address,
      date: date,
    })
    await result.save();
  }
  catch (e) {
    console.log("error" + e);
  }
}

export const createPackages = async function(
  title,
  description,
  image,
  catogery,
  items,
  tags
) {
  try {
    const packages = new PackagesModel({
      title: title,
      description: description,
      image: image,
      catogery: catogery,
      items: items,
      tags: tags,
    })
    await packages.save();
  } 
  catch (e) {
    console.log("error" + e);
  }
};


export const createCorporate = async (
  title,
  description,
  image,
  actualPrice,
  discountedPrice,
  catogery,
  tags,
  items,
) => {
  try {
    const corporate = new corporateModel({
      title: title,
      description: description,
      image: image,
      actualPrice: actualPrice,
      discountedPrice: discountedPrice,
      catogery: catogery,
      tags: tags,
      items: items,
    });
    await corporate.save();
  } catch (e) {
    console.log("error" + e);
  }
}

export async function createPartners(image, name) {
  try {
    const partners = new PartnersModel({
      image: image,
      name: name,
    });
    await partners.save();
  }
  catch (e) {
    console.log("error" + e);
  }
}

export async function createServices(image, name) {
  try {
    const partners = new ServicesModel({
      image: image,
      name: name,
    });
    await partners.save();
  }
  catch (e) {
    console.log("error" + e);
  }
}

export async function createFaq(question, answer, catogery) {
  try {
    const faq = new faqModel({
      question: question,
      answer: answer,
      catogery: catogery,
    });
    await faq.save();
  }
  catch (e) {
    console.log("error" + e);
  }
}

export async function createUserFoodPlates(userId, plates) {
  try {
    const existingPlate = await userFoodPlatesModel.findOne({ userId });

    if (existingPlate) {
      plates.forEach((newItem) => {
        const existingItem = existingPlate.plates.find(
          (item) => item.id === newItem.id
        );

        if (existingItem) {
          existingItem.quantity =
            (existingItem.quantity || 0) + newItem.quantity;
        } else {
          existingPlate.plates.push(newItem);
        }
      });

      await existingPlate.save();

      return { status: 200, message: "Plates updated successfully." };
    } else {
      const newPlate = new userFoodPlatesModel({
        userId,
        plates,
      });
      await newPlate.save();

      return { status: 201, message: "Plates created successfully." };
    }
  } catch (error) {
    console.error("Error creating or updating food plates:", error);

    return {
      status: 500,
      message: "Internal server error.",
    };
  }
}

export async function Catogery(name, image) {
  try {
    const catogery = new catogeryModel({
      name: name,
      image: image,
    });
    await catogery.save();
  } catch (e) {
    console.log("error" + e);
  }
}


export const createAdmins = async (name, email, password) => {
  try {
    const admin = new adminModel({
      name: name,
      email: email,
      password: password,
    });
    await admin.save();
  } catch (e) {
    console.log("error" + e);
  }
}