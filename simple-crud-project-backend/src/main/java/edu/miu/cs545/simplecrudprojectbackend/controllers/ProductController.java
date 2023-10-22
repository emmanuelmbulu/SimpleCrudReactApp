package edu.miu.cs545.simplecrudprojectbackend.controllers;

import edu.miu.cs545.simplecrudprojectbackend.domains.Product;
import edu.miu.cs545.simplecrudprojectbackend.services.ProductService;
import edu.miu.cs545.simplecrudprojectbackend.utils.HttpResponseBodyObjectImpl;
import edu.miu.cs545.simplecrudprojectbackend.utils.ProductErrorText;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {
    final private ProductService service;

    public ProductController(@Qualifier("productServiceImplementation") ProductService _service) {
        this.service = _service;
    }

    @GetMapping("")
    public List<Product> getAllBooks() {
        return service.getAllProducts();
    }

    @GetMapping("/search")
    public List<Product> search(@RequestParam(name = "q") String keyword) {
        if(keyword == null || keyword.isEmpty()) return service.getAllProducts();
        return service.getAllProductsContainingTheWordInTheTitle(keyword);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getItem(@PathVariable int id) {
        Product product = service.getOneById(id);
        if(product == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(product);
    }

    @PostMapping("")
    public ResponseEntity<?> addItem(@RequestBody(required = false) Product product) {
        if(product == null) {
            return ResponseEntity
                    .badRequest()
                    .body(
                            HttpResponseBodyObjectImpl.builder().code(1)
                                    .message(ProductErrorText.NULL_DATA.toString())
                                    .build()
                    );
        }

        String productTitle = product.getTitle();
        if(productTitle == null || productTitle.trim().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(
                            HttpResponseBodyObjectImpl.builder().code(1)
                                    .message(ProductErrorText.TITLE_MISSING.toString())
                                    .build()
                    );
        }

        productTitle = productTitle.trim();
        if(service.getOneByTitle(productTitle) != null) {
            return ResponseEntity
                    .badRequest()
                    .body(
                            HttpResponseBodyObjectImpl.builder().code(1)
                                    .message(ProductErrorText.TITLE_EXISTING.toString())
                                    .build()
                    );
        }

        if(product.getPrice() <= 0) {
            return ResponseEntity
                    .badRequest()
                    .body(
                            HttpResponseBodyObjectImpl.builder().code(1)
                                    .message(ProductErrorText.INVALID_PRICE.toString())
                                    .build()
                    );
        }

        product.setTitle(productTitle);
        product = service.saveProduct(product);
        if(product == null) {
            return ResponseEntity
                    .internalServerError()
                    .body(
                            HttpResponseBodyObjectImpl.builder().code(1)
                                    .message(ProductErrorText.FAILED_SAVING.toString())
                                    .build()
                    );
        }
        return ResponseEntity.ok(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateItem(@PathVariable int id, @RequestBody Product product) {
        if(product == null) {
            return ResponseEntity
                    .badRequest().body(
                            HttpResponseBodyObjectImpl.builder().code(1)
                                    .message(ProductErrorText.NULL_DATA.toString())
                                    .build()
                    );
        }

        Product productToUpdate = service.getOneById(id);
        if(productToUpdate == null) {
            return ResponseEntity
                    .badRequest().body(
                            HttpResponseBodyObjectImpl.builder().code(1)
                                    .message(ProductErrorText.PRODUCT_NOT_FIND.toString())
                                    .build()
                    );
        }

        String productTitle = product.getTitle();
        if(productTitle == null || productTitle.trim().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(
                            HttpResponseBodyObjectImpl.builder().code(1)
                                    .message(ProductErrorText.TITLE_MISSING.toString())
                                    .build()
                    );
        }

        productTitle = productTitle.trim();
        if(service.getOneByTitle(productTitle) != null &&
                !productToUpdate.getTitle().equalsIgnoreCase(productTitle)) {
            return ResponseEntity
                    .badRequest()
                    .body(
                            HttpResponseBodyObjectImpl.builder().code(1)
                                    .message(ProductErrorText.TITLE_EXISTING.toString())
                                    .build()
                    );
        }

        if(product.getPrice() <= 0) {
            return ResponseEntity
                    .badRequest()
                    .body(
                            HttpResponseBodyObjectImpl.builder().code(1)
                                    .message(ProductErrorText.INVALID_PRICE.toString())
                                    .build()
                    );
        }

        product = service.updateProduct(id, product);
        if(product == null) {
            return ResponseEntity
                    .internalServerError()
                    .body(
                            HttpResponseBodyObjectImpl.builder().code(1)
                                    .message(ProductErrorText.FAILED_SAVING.toString())
                                    .build()
                    );
        }
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable int id) {
        Product productToDelete = service.getOneById(id);
        if(productToDelete == null) {
            return ResponseEntity
                    .badRequest().body(
                            HttpResponseBodyObjectImpl.builder().code(1)
                                    .message(ProductErrorText.PRODUCT_NOT_FIND.toString())
                                    .build()
                    );
        }

        service.deleteProduct(id);
        return ResponseEntity.ok(productToDelete);
    }
}
