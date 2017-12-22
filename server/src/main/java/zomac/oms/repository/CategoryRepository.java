package zomac.oms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zomac.oms.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
