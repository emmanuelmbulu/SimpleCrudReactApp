import React from "react";
import {Navigate, useParams} from "react-router-dom";
import Product from "../../models/Product";
import ProductService from "../../services/ProductService";
import ProductForm from "../../components/ProductForm";
import ComponentWrapper from "../../utils/ComponentWrapper";
import ErrorNotification from "../../components/ErrorNotification";

type ProductUpdateState = {
    isSubmitted:boolean,
    gotError:boolean,
    errorMessage:string,
    id: number
};

class ProductUpdateBase extends React.Component<any, ProductUpdateState> {
    productId: number;
    productTitle: string;
    productPrice: number;
    productQuantity: number;

    product:Product|any;
    productForm:any;

    constructor(props:any) {
        super(props);
        this.state = {isSubmitted:false, id:0, gotError: false, errorMessage:''};
        this.productId = this.props.params.id;
        this.productPrice = 0;
        this.productQuantity = 0;
        this.productTitle = "";

        this.product = null;
        this.productForm = null;
    }

    getProductForm = (form:any) => {
        this.productForm = form;
    }

    componentDidMount() {
        (async () => {
            try{
                const response = await ProductService.getProductById(this.productId);
                this.product = Product.createProductObject(response.data);
                this.productForm.setProductToUpdate(this.product);
                this.setState({...this.state, id:this.productId})
            } catch (exception:any) {
                if(exception.response) {
                    this.setState({...this.state, id:-1});
                } else {
                    this.setState({...this.state, gotError: true, errorMessage: exception.message});
                }
            }
        })();
    }

    submit = (isSubmitted:boolean, exception:any) => {
        if(isSubmitted) this.setState({...this.state, isSubmitted, id:this.productId});
        else {
            if(exception.response) {
                this.setState({...this.state, gotError: true, errorMessage: exception.response.data.message});
            } else {
                this.setState({...this.state, gotError: true, errorMessage: exception.message});
            }
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    {this.state.id !== 0 && this.state.id !== -1 && <h1>Update the product: {this.product.title}</h1> }
                    {this.state.id === 0 && <h1>Update the product</h1> }
                    {this.state.id === -1 && <Navigate to={'/product-not-found'} replace={true} /> }
                </div>
                <hr />
                <div className="col-md-5 col-sm-9 mt-3">
                    {this.state.gotError && <ErrorNotification errorMessage={this.state.errorMessage} />}
                    <ProductForm ref={this.getProductForm} uriWhenCancelled={`/products/${this.productId}`} callbackFunction={this.submit} />
                </div>
                {this.state.isSubmitted && <Navigate to={'/products/' + this.state.id} replace={true} />}
            </div>
        );
    }
}

export const ProductUpdate = ComponentWrapper(ProductUpdateBase);