package zomac.oms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zomac.oms.model.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

}
