import React, {useContext} from "react";
import Product from "../models/Product";
import ProductTableItem from "./ProductTableItem";
import ProductTableEmptyItem from "./ProductTableEmptyItem";

type ProductTableProps = {
    className:string;
    data:Array<Product>;
}
export default class ProductTable extends React.Component<ProductTableProps, { products:Array<Product> }> {
    className:string | "table";

    constructor(props:ProductTableProps) {
        super(props);
        this.state = {
            products: props.data
        };
        this.className = props.className;
    }

    setData = (data:Array<Product>) => {
        this.setState(
            {
                products: data
            }
        );
    }

    render() {
        const {products} = this.state;
        return (
            <>
                <table className={this.className}>
                <thead>
                    <tr>
                        <th>#</th><th>Title</th><th className="text-end">Price</th><th className="text-end">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length != 0 && products.map(
                        (item, index) => <ProductTableItem key={item.getId()} index={index} item={item} />
                    )}
                    {products.length == 0 && <ProductTableEmptyItem /> }
                </tbody>
            </table>
            </>
        );
    }

}