package zomac.oms.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import zomac.oms.model.Customer;
import zomac.oms.repository.CustomerRepository;
import zomac.oms.repository.OrderRepository;
import zomac.oms.web.exception.BadRequestException;
import zomac.oms.web.exception.ResourceNotFoundException;
import zomac.oms.web.exception.ResourceRemoveException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer")
@Slf4j
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Customer> findAll() {
        log.info("Find all customers");
        return customerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Customer findOne(@PathVariable Long id) {
        log.info("Find customer with id {}", id);
        return Optional.ofNullable(customerRepository.findOne(id))
                .orElseThrow(ResourceNotFoundException::new);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Customer create(@RequestBody @Valid Customer customer) {
        log.info("Create new {}", customer);
        if (customer.getId() != null) {
            throw new BadRequestException();
        }
        return customerRepository.save(customer);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody @Valid Customer customer) {
        log.info("Update {}", customer);
        if (!id.equals(customer.getId())) {
            throw new BadRequestException();
        }
        customerRepository.save(customer);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        log.info("Delete customer with id {}", id);
        Customer customer = customerRepository.findOne(id);
        if(orderRepository.existsByCustomer(customer)) {
            throw new ResourceRemoveException("Customer has orders!");
        } else {
            customerRepository.delete(id);
        }
    }
}
