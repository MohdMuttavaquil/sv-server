import cloudinary from "../Config/cloudinaryConfig.js";
import streamifier from "streamifier";
import productModel from '../Model/productSchema.js'

const addProduct = async (req, res) => {

  const jsondata = req.body.data
  const data = JSON.parse(jsondata)
  
  try {

    //Upload Image on cloudinary
    if (!req.files || req.files.length === 0) {
      return res.json({ success: false, message: "Please upload images" });
    }

    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "ecommerce",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    };

    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer)
    );

    const results = await Promise.all(uploadPromises);

    const imageUrls = results.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));

    // Create Product in Database

    const newProduct = new productModel({
      name: data.name,
      desc: data.desc,
      category: data.category,
      MRPPrice: data.mrpPrice,
      price: data.price,
      quantity: data.quantity,
      size: data.size,
      admainName: req.user.userName,
      images: imageUrls
    })

    await newProduct.save()

    return res.json({ success: true, message: "Product uploaded successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some error occurred" });
  }
};

// Get all admain products
const allProducts = async (req, res) => {
  const name = req.user.userName

  try {
    const products = await productModel.find({ admainName: name }).select({
      name: 1, price: 1, images: { $slice: 1 }, quantity: 1, desc: 1
    })
    res.json({ success: true, products })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some error occurred" });
  }

}


// Edit products info
const editProduct = async (req, res) => {

  const { data } = req.body

  try {
    const product = await productModel.findById(data.id)
    if (data.mrpPrice) {
      product.MRPPrice = data.mrpPrice
    }

    if (data.price) {
      product.price = data.price
    }

    if (data.quantity) {
      product.quantity = product.quantity + Number(data.quantity)
    }

    if (data.removeSize) {
      data.removeSize.map((i) => {
        const exist = product.size.includes(i)

        if (exist) {
          const index = product.size.indexOf(i)
          product.size.splice(index, 1)
        }
      })
    }

    if (data.addSize) {
      product.size = [...product.size, ...data.addSize]
    }
    await product.save()

    res.json({ success: true, message: "Product Updated" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some error occurred" });
  }
}

// Delete Product 
const deleteProduct = async (req, res) => {

  const { id } = req.body

  try {
    const product = await productModel.findById(id)

    product.images.map((i) => {
       cloudinary.uploader.destroy(i.publicId)
    })
     await productModel.findByIdAndDelete(id)

     res.json({ success: true, message: "Product Deleted"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some error occurred" });
  }
}
export { addProduct, allProducts, editProduct, deleteProduct }