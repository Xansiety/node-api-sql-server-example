
import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, getTotalProducts, updateProduct } from "../controllers/products.controller.js";

const productRoutes = Router();

const prefix = "/api/v1";

productRoutes.get(`${prefix}/products`, getProducts);

productRoutes.get(`${prefix}/products/count`, getTotalProducts);

productRoutes.get(`${prefix}/products/:id`, getProductById);

productRoutes.post(`${prefix}/products`, createProduct);

productRoutes.put(`${prefix}/products/:id`, updateProduct);

productRoutes.delete(`${prefix}/products/:id`, deleteProduct);

export default productRoutes;