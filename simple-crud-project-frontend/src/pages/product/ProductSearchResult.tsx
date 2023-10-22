import React from "react";
import Product from "../../models/Product";
import ProductTable from "../../components/ProductTable";
import SearchProductForm from "../SearchProductForm";
import {Link} from "react-router-dom";
import axios from "axios";
import ProductService from "../../services/ProductService";
import ComponentWrapper from "../../utils/ComponentWrapper";

class ProductSearchResultBase extends React.Component<any, any> {
    products:Array<Product>;
    productsTable:ProductTable | null;
    keyword:string;

    constructor(props: any) {
        super(props);
        this.productsTable = null;
        this.keyword = this.props.params.searchParams.get('q');
        this.products = [];
    }

    componentDidMount = () => {
        (async () => {
            try {
                const response = await ProductService.searchWithKeyword(this.keyword);

                const listOfProducts:Array<Product> = [];
                for(let i=0; i < response.data.length; i++) {
                    const item = response.data[i];
                    listOfProducts.push(Product.createProductObject(item));
                }
                this.productsTable?.setData(listOfProducts);
            } catch (exception) {
                this.productsTable?.setData([]);
            }

        })();
    }

    getTable = (component:ProductTable) => {
        this.productsTable = component;
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8 col-sm-6">
                    <h1>Result for the keyword <mark>'{this.keyword}'</mark>.</h1>
                </div>
                <SearchProductForm />
                <hr/>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <ProductTable ref={this.getTable} className="table table-hover" data={this.products} />
                    </div>
                </div>
            </div>
        );
    }
}

export const ProductSearchResult = ComponentWrapper(ProductSearchResultBase);