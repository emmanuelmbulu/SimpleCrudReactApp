package edu.miu.cs545.simplecrudprojectbackend.services.implementations;

import edu.miu.cs545.simplecrudprojectbackend.repositories.ProductRepository;
import edu.miu.cs545.simplecrudprojectbackend.services.ProductService;
import edu.miu.cs545.simplecrudprojectbackend.domains.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImplementation implements ProductService {
    final private ProductRepository repository;

    public ProductServiceImplementation(ProductRepository repo) {
        this.repository = repo;
    }

    @Override
    public Product getOneById(int id) {
        if(id == 0) return null;
        return repository.findById(id).orElse(null);
    }

    @Override
    public Product getOneByTitle(String title) {
        return repository.findByTitleIgnoreCase(title).orElse(null);
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> data = new ArrayList<>();
        Iterable<Product> iterable = repository.findAll();
        for(Product item: iterable) data.add(item);
        return data;
    }

    @Override
    public List<Product> getAllProductsContainingTheWordInTheTitle(String word) {
        List<Product> data = new ArrayList<>();
        Iterable<Product> iterable = repository.findAllByTitleContainingIgnoreCase(word);
        for(Product item: iterable) data.add(item);
        return data;
    }

    @Override
    public Product updateProduct(int id, Product product) {
        Product productToUpdate = getOneById(id);
        if(productToUpdate == null) return null;

        if(product.getPrice() != 0) productToUpdate.setPrice(product.getPrice());
        if(product.getTitle() != null && !product.getTitle().trim().isEmpty()) {
            String productTitle = product.getTitle().trim();
            productToUpdate.setTitle(productTitle);
        }
        productToUpdate.setQuantity(product.getQuantity());
        return repository.save(productToUpdate);
    }

    @Override
    public Product deleteProduct(int id) {
        Product productToDelete = getOneById(id);
        if(productToDelete == null) return null;

        repository.delete(productToDelete);
        return productToDelete;
    }

    @Override
    public Product saveProduct(Product product) {
        if(product == null) return null;
        return repository.save(product);
    }
}
