import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from "fs";
import multer from "multer";

import {
  readAdmins,
  readById,
  readFood,
  readOrders,
  readCatogery,
  readAllFoods,
  readCorporate,
  readDetailsCorporate,
  readAllCorporate,
  readPartners,
  readServices,
  readFaq,
  getPackages,
  readCorporateOrders,
  readPackages,
} from "./mongo/read.js";
import {
  CreateFood,
  Catogery,
  createOrders,
  createAdmins,
  createCorporate,
  createPartners,
  createServices,
  createFaq,
  createPackages,
  orderCorporate,
  orderPackages,
} from "./mongo/create.js";

import { deleteData, removeCorporate, removeFaq, removePartners, removeServices } from "./mongo/delete.js";
import { UpdateCategory, updateCorporate, updateFaq, updateFood, updatePackage, updatePartners, updateServices, updateUser } from "./mongo/update.js";
import foodModel, { adminModel, corporateModel, OrderCorporateModel, orderModel, PackageOrderModel, PackagesModel } from "./mongo/schema.js";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

const port = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;
const URL = process.env.FRONTEND_URL;

const connection = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("\nDatabase connected");
    })
    .catch((e) => {
      console.log(e);
    });
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.use(
  session({
    secret: process.env.SESSION_BYTE,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }), // Store sessions in MongoDB
    cookie: {
      name: "connection.sid",
      maxAge: 24 * 60 * 60 * 1000, // 1 hour
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "Lax",
    },
  })
);

app.get("/", (req, res) => {
  res.redirect(URL);
});

app.post('/admins/new', async function(req, res) {
  const { email, password, name } = req.body;
  const userEmail = await adminModel.find({ email: email});
  
  if (email !== userEmail[0]?.email) {
    await createAdmins(name, email, password)
    res.send({"message": "Added successfully", "success": "true"});
  }
})


app.get('/admins/dashboard', async function(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized', success: false });
  }
  const user = await adminModel.findById(req.session.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found', success: false });
  }
  console.log(req.session.userId);
  return res.status(200).json({ message: 'OK', success: true, data: user });

}); 

// Error handling middleware (optional)


app.post('/admins/login', async function(req, res) {
  const { email, password } = req.body;
  const cred = await adminModel.find({email: email, password: password });

  if (cred.length === 0) {
    return res.status(200).json({ message: "Not found", success: false });
  }

  req.session.userId = cred._id;
  return res.status(200).json({
    user: { id: cred._id, role: cred.role, email: cred.email },
    message: "OK",
    success: true
  });

});

app.get("/Category", async (req, res) => {
  const response = await readCatogery();
  return res.send(response);
});

app.post("/category/create", async (req, res) => {
  const data = req.body;
  const image = data.image;
  const lowerCase = data.name.toLowerCase();
  const response = await Catogery(lowerCase, image);
  res.send(response);
});

app.put("/category/update", async (req, res) => {
  const { id, name, image } = req.body;
  const lowerCase = name.toLowerCase();
  await UpdateCategory(id, lowerCase, image);
  res.sendStatus(200);
});


app.put("/update", async (req, res) => {
  const { id, name, description, price, image, rating, isVeg, catogery, isPopular } = req.body;
  await updateFood(
    id,
    name,
    description,
    price,
    image,
    rating,
    isVeg,
    catogery,
    isPopular
  );
  res.send({
    message: "Data updated successfully",
  });
});

app.get("/Admins", async (req, res) => {
  const users = await readAdmins();  
  res.send(users);
});


app.get("/Foods", async (req, res) => {
  const food = await readAllFoods();
  res.send(food);
});



app.get("/popular", async (req, res) => {
  const food = await foodModel.find({ isPopular: true });
  res.send(food);
});

app.get("/Foods/:catogery", async (req, res) => {
  const { catogery } = req.params;
  const food = await readFood(catogery);
  res.send(food);
});

app.post("/search", async (req, res) => {
  const { endpoint, id } = req.body;
  const food = await readById(endpoint, id);
  res.send(food);
});
app.post("/delete", async (req, res) => {
  const { endpoint, id } = req.body;
  const response = await deleteData(endpoint, id);
  res.send({
    message: "Data deleted successfully",
  });
});
app.put("/users/update", async (req, res) => {
  const { id, name, email, password, role } = req.body;
  const response = await updateUser(id, name, email, password, role);
  res.send({
    message: { response },
  });
});

app.post("/createFood", async (req, res) => {
  const { name, description, price, image, rating, isVeg, catogery, isPopular } = req.body;
  await CreateFood(name, description, price, image, rating, isVeg, catogery, isPopular);
  res.send({
    message: "Data added successfully",
  });
});

app.get('/Clients', async (req, res) => {
  const response = await readPartners();
      res.status(200).send(response);
})

app.post('/createClient', async (req, res) => {
    const {name, image} = req.body;
    await createPartners(image, name);
    res.sendStatus(200)
})


app.put('/postClient', async (req, res) => {
  const {id, name, image} = req.body;
  const response = await updatePartners(id, image, name);

    res.sendStatus(200);

})

app.delete('/delClient', async (req, res) => {
  const {id} = req.body;
  const response = await removePartners(id);

    res.sendStatus(200);

})



app.get('/Services', async (req, res) => {
  const response = await readServices();

      res.send(response);

})


app.delete('/delServices', async (req, res) => {
  const {id} = req.body;
  const response = await removeServices(id);

    res.sendStatus(200);

})

app.post('/createServices', async (req, res) => {
    const {name, image} = req.body;
    await createServices(image, name);
      res.sendStatus(200)
})

app.put('/postServices', async (req, res) => {
  const {id, name, image} = req.body;
  const response = await updateServices(id, image, name);

    res.sendStatus(200);
})


app.get('/Faq', async (req, res) => {
  const response = await readFaq();

      res.send(response);

})


app.delete('/delFaq', async (req, res) => {
  const {id} = req.body;
  const response = await removeFaq(id);

    res.sendStatus(200);

})

app.post('/createFaq', async (req, res) => {
    const {question, answer, catogery} = req.body;    
    const response = await createFaq(question, answer, catogery);
    res.sendStatus(200)
})

app.put('/updateFaq', async (req, res) => {
  const {id, answer, question, catogery} = req.body;
  const response = await updateFaq(id, question, answer, catogery);

    res.sendStatus(200);

})

app.get('/Corporate', async (req, res) => {
  const response = await readAllCorporate();
      res.send(response);  
})

app.get('/CorporateList', async (req, res) => {
    const response = await readCorporate();
    res.send(response); 
})


app.get('/corporateDetails/id=:id', async (req, res) => {
  const { id } = req.params;
  const response = await readDetailsCorporate(id);
      res.send(response);  
})

app.get('/CorporateItems/id=:id', async (req, res) => {
  const {id} = req.params;
  const fullData = await corporateModel.findById({_id: id}).select({items: 1, _id: 0});
  const getFood = await foodModel.find({name: fullData.items})
  res.status(200).send(getFood);
})

app.get('/packageItems/id=:id', async (req, res) => {
  const {id} = req.params;
  const fullData = await PackagesModel.findById({_id: id}).select({items: 1, _id: 0});
  const getFood = await foodModel.find({name: fullData.items})
  res.status(200).send(getFood);
})
app.post('/orderPackages', async (req, res) => {
  const {itemName, name, email, phone, address, date, customize } = req.body;
  await orderPackages(itemName, name, email, phone, address, date, customize);
  res.status(200).send({ message: "Order placed successfully" });
})
app.get('/Packages%20orders', async function (req, res) {
  const response = await readPackages();
  res.status(200).send(response);
})


app.post('/orderCorporate', async (req, res) => {
  const {itemName, name, email, phone, address, date } = req.body;
  await orderCorporate(itemName, name, email, phone, address, date);
  res.status(200).send({ message: "Order placed successfully" });
})

app.get('/Corporate%20orders', async (req, res) => {
  const response = await readCorporateOrders();
  res.status(200).send(response);
})
app.get('/Packages', async (req, res) => {
  const response = await getPackages();
  res.status(200).send(response);
})

app.get('/packagesDetails/id=:id', async (req, res) => {
  const { id } = req.params;
  const response = await PackagesModel.find({_id: id});
  res.status(200).send(response);
})
app.post('/createPackages', async (req, res) => {
  const {name, description, image, catogery, items, tags} = req.body;
  await createPackages(name, description, image, catogery, items, tags);
  res.sendStatus(200);
})

app.put('/updatePackages', async (req, res) => {
  const {id, name, description, image, catogery, items, tags} = req.body;
  await updatePackage(id, name, description, image, catogery, items, tags);
  res.sendStatus(200);
})



app.post('/addCorporate', async (req, res) => {
  const { name, description, image, actualPrice, discountedPrice, catogery, tags, items } = req.body;
  console.log(name, description, image, actualPrice, discountedPrice, catogery, tags, items);
  await createCorporate(name, description, image, actualPrice, discountedPrice, catogery, tags, items);
  res.status(200).send({ message: "Data added successfully" });
})

app.put('/updateCorporate', async (req, res) => {
  const {id, name, description, image, actualPrice, discountedPrice, catogery, tags, items } = req.body;
  await updateCorporate(id, name, description, image, actualPrice, discountedPrice, catogery, tags, items);
  res.status(200).send({ message: "Data Updated successfully" });
})

app.post("/deleteCorporate", async (req, res) => {
  const { id } = req.body;
  await removeCorporate(id);
  res.send({ message: "Data deleted successfully" });
})

app.post("/plate", async (req, res) => {
  const data = req.body;
  const response = await foodModel.find({ _id: { $in: data } });
  res.send(response);
});

app.get('/notes/:id', async (req, res) => {
  const id = req.params.id;
  const response = await orderModel.find({ _id: id }).select({ mynote: 1, _id: 0 });
  res.status(200).send(response);
})
app.post('/notes/add', async (req, res) => {
  const {id, mynote} = req.body;
  const response = await orderModel.updateOne({ _id: id }, { $push: {
    mynote: mynote
  }});
  res.status(200).send(response);
})

app.put('/notes/update', async (req, res) => {
  const { id, oldNote, newNote } = req.body; // Get document ID and notes from request

  try {
    const document = await orderModel.findById(id);

    if (!document) {
      return res.status(404).send({ message: 'Document not found' });
    }
    const noteIndex = document.mynote.indexOf(oldNote);

    if (noteIndex === -1) {
      return res.status(404).send({ message: 'Note not found in array' });
    }
    document.mynote[noteIndex] = newNote;
    await document.save();

    res.status(200).send({ message: 'Note updated successfully', document });
  } catch (error) {
    res.status(500).send({ message: 'Error updating note', error });
  }
});

app.delete('/notes/delete/:id/:note', async (req, res) => {
  const { id, note } = req.params; // Get document ID and note to delete
  try {
    console.log(id, note);
    await orderModel.updateOne(
      { _id: id },
      { $pull: { mynote: note } }
    );
    res.status(200).send({ message: 'Note deleted successfully' });
  } 
  catch (error) {
    res.status(500).send({ message: 'Error deleting note', error });
  }
});



app.post("/addOrder", async (req, res) => {
  const {
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
  } = req.body;
  // console.log(req.body);

  await createOrders(
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
  );
  res.send({ message: "Added successfully...!" });
});

app.get("/Orders", async (req, res) => {
  const orders = await readOrders();
  res.send(orders);
});

app.get("/invoice/:id", async (req, res) => {
  const { id } = req.params;
  const order = await orderModel.find({_id: id});
  res.status(200).send(order);
  
})
app.get('/getStatus', async (req, res) => {
  const response = await orderModel.find().select({ status: 1, _id: 1 })
  res.send(response)
})

app.get('/corporateStatus', async (req, res) => {
  const response = await OrderCorporateModel.find().select({ status: 1, _id: 1 })
  res.send(response)
})

app.get('/packagesStatus', async (req, res) => {
  const response = await PackageOrderModel.find().select({ status: 1, _id: 1 })
  res.send(response)
})



app.get('/statusHistory/:tab/:id', async (req, res) => {
  const id = req.params.id
  const tab = req.params.tab;
  if (tab==="Orders") {
    const response = await orderModel.find({ _id: id}).select({ statusHistory: 1, _id: 0 })
    res.status(200).send(response)
  }
  if (tab==="Corporate orders") {
    const response = await OrderCorporateModel.find({ _id: id}).select({ statusHistory: 1, _id: 0 })
    res.status(200).send(response)
  }
})


app.put('/status', async (req, res) => {
  const { id, status } = req.body;
  await orderModel.updateOne({ _id: id }, { $set: { status: status }, $push: {
    statusHistory: {
      status: status,
      changedAt: new Date(),
    }
  } });
  res.send({ message: "Updated successfully" });
})

app.put('/changeStatus', async (req, res) => {
  const { id, status } = req.body;
  await OrderCorporateModel.updateOne({ _id: id }, { $set: { status: status }, $push: {
    statusHistory: {
      status: status,
      changedAt: new Date(),
    }
  } });
  res.send({ message: "Updated successfully" });
})

app.put('/changepackagesStatus', async (req, res) => {
  const { id, status } = req.body;
  await PackageOrderModel.updateOne({ _id: id }, { $set: { status: status }, $push: {
    statusHistory: {
      status: status,
      changedAt: new Date(),
    }
  } });
  res.send({ message: "Updated successfully" });
})

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: "adarshpanditdev@gmail.com",
    pass: "xsnyetqwdjegfvbw",
  },
});

// Endpoint to handle sending email with PDF attachment
app.post("/send-invoice", upload.single("pdf"), (req, res) => {
  const { customerEmail } = req.body;
  const pdfPath = req.file.path; // Get the file path from multer

  // Define mail options
  const mailOptions = {
    from: "adarshpanditdev@gmail.com", // Sender email
    to: customerEmail, // Customer's email
    subject: "Your Invoice",
    text: "Here is your invoice attached.",
    attachments: [
      {
        filename: "invoice.pdf", // You can name the PDF here
        path: pdfPath, // Attach the uploaded PDF
      },
    ],
  };

  // Send the email with Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ success: false, message: error.toString() });
    }

    // Delete the uploaded PDF after sending the email
    fs.unlink(pdfPath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    res.status(200).send({ success: true, message: "Email sent: " + info.response });
    console.log('sent');
    
  });
});


connection();