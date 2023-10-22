
import Product from "../models/Product";
import React from "react";
import {Link} from "react-router-dom";

type ProductTableItemProps = {
    index:number|0,
    item:Product
}

export default class ProductTableItem extends React.Component<ProductTableItemProps> {
    index:number | 0;
    product:Product | null;
    constructor(props:ProductTableItemProps | Readonly<ProductTableItemProps>) {
        super(props);
        this.index = props.index;
        this.product = props.item;
    }

    render() {
        return (
            <tr>
                <th>{this.index + 1}</th>
                <td>{/*this.product?.title*/}
                    <Link to={'/products/' + this.product?.getId()}>{this.product?.getTitle()}</Link>
                </td>
                <td className="text-end">{this.product?.getPrice()}</td>
                <td className="text-end">{this.product?.getQuantity()}</td>
            </tr>
        );
    }
}