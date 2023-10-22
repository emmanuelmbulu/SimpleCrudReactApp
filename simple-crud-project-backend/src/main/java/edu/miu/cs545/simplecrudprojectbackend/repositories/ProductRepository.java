package edu.miu.cs545.simplecrudprojectbackend.repositories;

import edu.miu.cs545.simplecrudprojectbackend.domains.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ProductRepository extends CrudRepository<Product, Integer> {
    Optional<Product> findByTitleIgnoreCase(String title);
    Iterable<Product> findAllByTitleContainingIgnoreCase(String ref);
}
