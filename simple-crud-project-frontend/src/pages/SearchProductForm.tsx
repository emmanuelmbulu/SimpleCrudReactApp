import React from "react";

export default class SearchProductForm extends React.Component<any, any> {
    render() {
        return (
            <div className="col-md-4 col-sm-6">
                <form className="row g-3" action="/products/search-result" >
                    <div className="col-auto">
                        <label htmlFor="keyword" className="visually-hidden">Search product...</label>
                        <input type="text" name="q" className="form-control" id="keyword" placeholder="Search product.." />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3">Go</button>
                    </div>
                </form>
            </div>
        );
    }
}