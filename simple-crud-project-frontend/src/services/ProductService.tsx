import {axiosInstance} from "../config/AxiosConfig";
import Product from "../models/Product";

export default class ProductService {
    static addProduct = (product: Product) => axiosInstance.post('/products', JSON.parse(product.toString()));
    static getProductById = (id:number) => axiosInstance.get(`/products/${id}`);
    static updateProduct = (id:number, product:Product) => axiosInstance.put(`/products/${id}`, JSON.parse(product.toString()));
    static deleteProduct = (id:number) => axiosInstance.delete(`/products/${id}`);
    static getAllProducts = () => axiosInstance.get('/products');
    static searchWithKeyword = (keyword:string) => axiosInstance.get('/products/search?q=' + keyword);
}