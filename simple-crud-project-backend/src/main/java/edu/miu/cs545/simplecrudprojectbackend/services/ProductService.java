package edu.miu.cs545.simplecrudprojectbackend.services;

import org.springframework.stereotype.Service;
import edu.miu.cs545.simplecrudprojectbackend.domains.Product;

import java.util.List;

@Service
public interface ProductService {
    Product getOneById(int id);
    Product getOneByTitle(String title);
    List<Product> getAllProducts();
    List<Product> getAllProductsContainingTheWordInTheTitle(String word);
    Product updateProduct(int id, Product product);
    Product deleteProduct(int id);
    Product saveProduct(Product product);
}
