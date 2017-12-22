package zomac.oms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import zomac.oms.model.Category;
import zomac.oms.model.Product;
import zomac.oms.model.Supplier;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Boolean existsByCategory(Category category);

    Boolean existsBySupplier(Supplier supplier);

    @Query(value = "SELECT p FROM Product p JOIN FETCH p.supplier s JOIN FETCH p.category c")
    List<Product> findAllWithSupplierAndCategory();
}
