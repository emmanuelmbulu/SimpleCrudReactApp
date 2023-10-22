import React from "react";
import Product from "../models/Product";
import {Link} from "react-router-dom";
import ProductService from "../services/ProductService";

type ProductFormProps = {
    callbackFunction:Function,
    uriWhenCancelled:string,
}

type ProductFormState = {
    isSubmitted:boolean|false;
}
export default class ProductForm extends React.Component<ProductFormProps, ProductFormState> {
    productId:number;

    productTitle: HTMLInputElement|any;
    productPrice: HTMLInputElement|any;
    productQuantity: HTMLInputElement|any;

    inputTitle: HTMLInputElement|any;
    inputPrice: HTMLInputElement|any;
    inputQuantity: HTMLInputElement|any;

    productToUpdate:Product|null;
    callbackFunction:Function;
    uriWhenCancelled:string;

    constructor(props:ProductFormProps) {
        super(props);

        this.productId = 0;
        this.productTitle = '';
        this.productPrice = 0.0;
        this.productQuantity = 0;

        this.inputQuantity = React.createRef();
        this.inputTitle = React.createRef();
        this.inputPrice = React.createRef();

        this.productToUpdate = null;
        this.callbackFunction = this.props.callbackFunction;
        this.uriWhenCancelled = this.props.uriWhenCancelled;
    }

    setProductToUpdate = (product:Product) => {
        this.productToUpdate = product;
        this.productId = this.productToUpdate.getId();
        this.productQuantity = this.productToUpdate.getQuantity();
        this.productTitle = this.productToUpdate.getTitle();
        this.productPrice = this.productToUpdate.getPrice();
        this.setState({isSubmitted:false});
    }

    submit = () => {
        const product:Product = new Product(
            0, this.productTitle,
            this.productQuantity, this.productPrice
        );

        if(this.productToUpdate == null) {
            (async () => {
                try{
                    await ProductService.addProduct(product);
                    this.callbackFunction(true);
                } catch(ex) {
                    this.callbackFunction(false, ex);
                }
            })();
        } else {
            (async () => {
                try{
                    await ProductService.updateProduct(this.productId, product);
                    this.callbackFunction(true);
                } catch(ex) {
                    this.callbackFunction(false, ex);
                }
            })();
        }
    }

    componentDidUpdate(prevProps: Readonly<ProductFormProps>, prevState: Readonly<ProductFormState>, snapshot?: any) {
        if(this.productToUpdate !== null) {
            this.inputTitle.current.value = this.productToUpdate.getTitle();
            this.inputQuantity.current.value = this.productToUpdate.getQuantity();
            this.inputPrice.current.value = this.productToUpdate.getPrice();
        }
    }

    getTitleValue = (event:React.ChangeEvent<HTMLInputElement>) => this.productTitle = event.target.value;

    getQuantityValue = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value:string = event.target.value;
        if(value) {
            try {
                this.productQuantity = parseInt(value);
            } catch (e) {
                event.target.value = "0";
            }
        }
    }

    getPriceValue = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value:string = event.target.value;
        if(value) {
            try {
                this.productPrice = parseFloat(value);
            } catch (e) {
                event.target.value = "0.0";
            }
        }
    }

    render() {
        return (
            <div className="row">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input ref={this.inputTitle} onChange={this.getTitleValue} type="text" className="form-control" id="title" placeholder="product's title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Unit price (USD)</label>
                    <input ref={this.inputPrice} onChange={this.getPriceValue} type="text" className="form-control" id="price" placeholder="Ex: 12.5" />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input ref={this.inputQuantity} onChange={this.getQuantityValue} type="number" min="0" className="form-control" id="quantity" placeholder="Ex: 100" />
                </div>
                <hr />
                <div className="mb-3">
                    <button onClick={this.submit} className="btn btn-primary me-2">Submit</button>
                    <Link to={this.uriWhenCancelled} className="btn btn-danger">Cancel</Link>
                </div>
            </div>
        );
    }
}