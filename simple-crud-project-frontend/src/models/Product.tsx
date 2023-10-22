export default class Product {
    private id:number | 0;
    private title:string | "";
    private quantity:number | 0;
    private price:number | 0.0;

    constructor(id:number, title:string, quantity:number, price:number) {
        this.id = id;
        this.title = title;
        this.quantity = quantity;
        this.price = price;
    }

    setId = (value:number) => {
        this.id = value;
    }

    getId = ():number => {
        return this.id;
    }

    setTitle = (value:string) => {
        this.title = value;
    }

    getTitle = ():string => {
        return this.title;
    }

    setPrice = (value:number) => {
        this.price = value;
    }

    getPrice = ():number => {
        return this.price;
    }

    setQuantity = (value:number) => {
        this.quantity = value;
    }

    getQuantity = ():number => {
        return this.quantity;
    }

    toString = ():string => {
        return `{"id":${this.id},
            "title":"${this.title}",
            "quantity":${this.quantity},
            "price":${this.price} 
            }`;
    }

    static createProductObject = (item:{id:number, title:string, quantity:number, price:number}) => {
        return new Product(item.id, item.title, item.quantity, item.price);
    }

}