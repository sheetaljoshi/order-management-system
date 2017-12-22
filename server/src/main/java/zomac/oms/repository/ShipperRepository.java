package zomac.oms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zomac.oms.model.Shipper;

public interface ShipperRepository extends JpaRepository<Shipper, Long> {

}
