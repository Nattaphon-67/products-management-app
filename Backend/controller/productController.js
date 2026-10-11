import Product from "../model/productModel.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, image } = req.body;
    if (!name || price === undefined || price === null || price === "") {
      return res
        .status(400)
        .json({ message: "Name and Price are required fields" });
    }

    const newProduct = await Product.create({
      name,
      price: Number(price),
      description: description || null,
      image: image || null,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const { name, price, description, image } = req.body;
    if (
      name === undefined &&
      price === undefined &&
      description === undefined &&
      image === undefined
    ) {
      return res
        .status(400)
        .json({ message: "At least one field is required to update" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update({
      name: name !== undefined ? name : product.name,
      price: price !== undefined && price !== "" ? Number(price) : product.price,
      description: description !== undefined ? description : product.description,
      image: image !== undefined ? image : product.image,
    });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    return res.status(200).json({
      message: "Product is deleted successfully",
      deletedProducts: product,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
