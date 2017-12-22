package zomac.oms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zomac.oms.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
