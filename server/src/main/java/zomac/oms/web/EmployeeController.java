package zomac.oms.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import zomac.oms.model.Employee;
import zomac.oms.repository.EmployeeRepository;
import zomac.oms.repository.OrderRepository;
import zomac.oms.web.exception.BadRequestException;
import zomac.oms.web.exception.ResourceNotFoundException;
import zomac.oms.web.exception.ResourceRemoveException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
@Slf4j
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Employee> findAll() {
        log.info("Find all Employees");
        return employeeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Employee findOne(@PathVariable Long id) {
        log.info("Find employee with id {}", id);
        return Optional.ofNullable(employeeRepository.findOne(id))
                .orElseThrow(ResourceNotFoundException::new);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Employee create(@RequestBody @Valid Employee employee) {
        log.info("Create new {}", employee);
        if (employee.getId() != null) {
            throw new BadRequestException();
        }
        return employeeRepository.save(employee);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody @Valid Employee employee) {
        log.info("Update {}", employee);
        if (!id.equals(employee.getId())) {
            throw new BadRequestException();
        }
        employeeRepository.save(employee);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        log.info("Delete employee with id {}", id);
        Employee employee = employeeRepository.findOne(id);
        if(orderRepository.existsByEmployee(employee)) {
            throw new ResourceRemoveException("Employee has orders!");
        } else {
            employeeRepository.delete(id);
        }
    }
}
