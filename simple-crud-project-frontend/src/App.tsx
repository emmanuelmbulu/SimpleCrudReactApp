import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import ProductList from "./pages/product/ProductList";
import ProductAdd from "./pages/product/ProductAdd";
import {ProductUpdate} from "./pages/product/ProductUpdate";
import {ProductDetails} from "./pages/product/ProductDetails";
import NotFound from "./pages/404";
import {ProductSearchResult} from "./pages/product/ProductSearchResult";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<ProductList />} />
        <Route path="products" >
          <Route index element={<ProductList />} />
          <Route path=":id" element={<ProductDetails />} />
          <Route path=":id/update" element={<ProductUpdate />} />
          <Route path="add-new-product" element={<ProductAdd />} />
          <Route path="search-result" element={<ProductSearchResult />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
