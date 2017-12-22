package zomac.oms.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import zomac.oms.model.Category;
import zomac.oms.repository.CategoryRepository;
import zomac.oms.repository.ProductRepository;
import zomac.oms.web.exception.BadRequestException;
import zomac.oms.web.exception.ResourceNotFoundException;
import zomac.oms.web.exception.ResourceRemoveException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/category")
@Slf4j
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Category> findAll() {
        log.info("Find all categories");
        return categoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Category findOne(@PathVariable Long id) {
        log.info("Find category with id {}", id);
        return Optional.ofNullable(categoryRepository.findOne(id))
                .orElseThrow(ResourceNotFoundException::new);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Category create(@RequestBody @Valid Category category) {
        log.info("Create new {}", category);
        if (category.getId() != null) {
            throw new BadRequestException();
        }
        return categoryRepository.save(category);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody @Valid Category category) {
        log.info("Update {}", category);
        if (!id.equals(category.getId())) {
            throw new BadRequestException();
        }
        categoryRepository.save(category);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        log.info("Delete category with id {}", id);
        Category category = categoryRepository.findOne(id);
        if(productRepository.existsByCategory(category)) {
            throw new ResourceRemoveException("Category has products!");
        } else {
            categoryRepository.delete(id);
        }
    }
}
