import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: false,
    default: "admin",
  },
});

export const adminModel = new mongoose.model("admins", adminSchema);

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  catogery: {
    type: String,
    required: true,
  },
  isPopular: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const foodModel = new mongoose.model("foods", foodSchema);
export default foodModel;

const statusHistorySchema = new mongoose.Schema({
  status: String, // New status
  changedAt: Date, // When the status was changed
  default: "Ordered"
});

const Orders = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  functionType: {
    type: String,
    required: false,
  },
  noOfPeople: {
    type: String,
    required: false,
  },
  foodPreference: {
    type: String,
    required: false,
  },
  items: {
    type: [],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: "ordered"
  },
  statusHistory: { type: [statusHistorySchema], required: false },
});

export const orderModel = mongoose.model("orders", Orders);

const catogerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
});

export const catogeryModel = mongoose.model("catogery", catogerySchema);

const Corporate = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  isVeg: {
    type: Boolean,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  items: {
    type: [],
    required: true,
  },
});

export const corporateModel = mongoose.model("corporate", Corporate);

const partnersAndServicesSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
export const PartnersModel = mongoose.model(
  "partners",
  partnersAndServicesSchema
);
export const ServicesModel = mongoose.model(
  "services",
  partnersAndServicesSchema
);

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  catogery: {
    type: String,
    required: true,
  },
});

export const faqModel = mongoose.model("faq", faqSchema);
