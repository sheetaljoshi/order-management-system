package zomac.oms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zomac.oms.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
