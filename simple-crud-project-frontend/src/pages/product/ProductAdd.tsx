import React from "react";
import {Navigate} from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import ErrorNotification from "../../components/ErrorNotification";

type ProductAddState = {
    isSubmitted:boolean,
    gotError:boolean,
    errorMessage:string,
};

export default class ProductAdd extends React.Component<any, ProductAddState> {
    productTitle: string;
    productPrice: number;
    productQuantity: number;

    constructor(props:any) {
        super(props);
        this.state = {isSubmitted:false, gotError: false, errorMessage: ''};
        this.productPrice = 0;
        this.productQuantity = 0;
        this.productTitle = "";
    }

    submit = (isSubmitted:boolean, exception:any) => {
        if(isSubmitted) this.setState({isSubmitted});
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
                    <h1>Add new product</h1>
                </div>
                <hr />
                <div className="col-md-5 col-sm-9 mt-3">
                    {this.state.gotError && <ErrorNotification errorMessage={this.state.errorMessage} />}
                    <ProductForm callbackFunction={this.submit} uriWhenCancelled={'/products'} />
                </div>

                {this.state.isSubmitted && <Navigate to={'/products'} replace={true} />}
            </div>
        );
    }
}