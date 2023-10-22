import React from "react";
import Product from "../../models/Product";
import ProductTable from "../../components/ProductTable";
import SearchProductForm from "../SearchProductForm";
import {Link} from "react-router-dom";
import axios from "axios";
import ProductService from "../../services/ProductService";


export default class ProductList extends React.Component<any, any> {
    private products:Array<Product>;
    private productsTable:ProductTable | null;

    constructor(props: any) {
        super(props);
        this.productsTable = null;

        this.products = [];
    }

    componentDidMount() {
        (async () => {
            const response = await ProductService.getAllProducts();

            const listOfProducts:Array<Product> = [];
            for(let i=0; i < response.data.length; i++) {
                const item = response.data[i];
                listOfProducts.push(Product.createProductObject(item));
            }
            this.productsTable?.setData(listOfProducts);
        })();
    }

    getTable = (component:ProductTable) => {
        this.productsTable = component;
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8 col-sm-6">
                    <h1>List of products</h1>
                </div>
                <SearchProductForm />
                <hr/>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <ProductTable ref={this.getTable} className="table table-hover" data={this.products} />
                    </div>
                    <div className="col-md-12">
                        <Link to="/products/add-new-product" className="btn btn-primary">Add new product</Link>
                    </div>
                </div>
            </div>
        );
    }
}