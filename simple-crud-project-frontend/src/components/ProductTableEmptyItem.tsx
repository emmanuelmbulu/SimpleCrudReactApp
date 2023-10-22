
import Product from "../models/Product";
import React from "react";
import {Link} from "react-router-dom";

export default class ProductTableEmptyItem extends React.Component<any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td colSpan={4}>We did not find any products.</td>
            </tr>
        );
    }
}