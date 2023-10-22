// @ts-ignore
import React from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import Product from "../../models/Product";
import ProductService from "../../services/ProductService";
import ComponentWrapper from "../../utils/ComponentWrapper";
import ErrorNotification from "../../components/ErrorNotification";

type ProductDetailsState = {
    id:number,
    isDeleted:boolean,
    gotError:boolean,
    errorMessage:string,
}

class ProductDetailsBase extends React.Component<any, ProductDetailsState> {
    productId:number;
    product:Product|any;

    constructor(props:any) {
        super(props);
        this.productId = this.props.params.id;
        this.product = null;
        this.state = {id: 0, isDeleted: false, gotError: false, errorMessage: ''}
    }

    componentDidMount() {
        (async () => {
            try{
                const response = await ProductService.getProductById(this.productId);
                this.product = Product.createProductObject(response.data);
                this.setState({id: this.productId, isDeleted:false});
            } catch (exception:any) {
                if(exception.response) {
                    this.setState({...this.state, id:-1});
                } else {
                    this.setState({...this.state, gotError: true, errorMessage: exception.message});
                }
            }
        })();
    }

    handleDelete = () => {
        (async () => {
            try{
                const response = await ProductService.deleteProduct(this.productId);
                this.product = Product.createProductObject(response.data);
                this.setState({id: this.productId, isDeleted:true});
            } catch (exception:any) {
                if(exception.response) {
                    this.setState({...this.state, id:-1});
                } else {
                    this.setState({...this.state, gotError: true, errorMessage: exception.message});
                }
            }
        })();
    }

    render() {
        return (
            <>
                {this.state.isDeleted && <Navigate to={'/products'} />}
                {this.state.id === -1 && <Navigate to={'/product-not-found'} replace={true} /> }
                <div className="row">
                    <div className="col-md-12">
                        <h1>Product details</h1>
                    </div>
                    <hr />
                    <div className="col-md-6 col-sm-9 mt-3">
                        {this.state.gotError && <ErrorNotification errorMessage={this.state.errorMessage} />}
                        <div className="mb-3">
                            <dl className="row">
                                <dt className="col-sm-5">Title :</dt>
                                <dd className="col-sm-7">{this.product && this.product.getTitle()}</dd>

                                <dt className="col-sm-5">Price :</dt>
                                <dd className="col-sm-7">{this.product && this.product.getPrice()} USD</dd>

                                <dt className="col-sm-5">Quantity :</dt>
                                <dd className="col-sm-7">{this.product && this.product.getQuantity()} Units</dd>
                            </dl>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Link to={`/products/${this.productId}/update`} className="btn btn-primary me-2">Edit</Link>
                            <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalDeleteProduct">Delete</button>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modalDeleteProduct" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete {this.product && this.product.getTitle()}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                You are about to permanently delete this product. Are you sure that it is what you want?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" onClick={this.handleDelete} className="btn btn-danger"  data-bs-dismiss="modal">Delete anyway</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

export const ProductDetails = ComponentWrapper(ProductDetailsBase);