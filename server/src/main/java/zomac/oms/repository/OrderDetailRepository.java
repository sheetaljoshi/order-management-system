package zomac.oms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zomac.oms.model.OrderDetail;
import zomac.oms.model.Product;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    Boolean existsByProduct(Product product);
}
