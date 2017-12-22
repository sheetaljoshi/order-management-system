package zomac.oms.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import zomac.oms.model.Order;
import zomac.oms.repository.OrderRepository;
import zomac.oms.web.exception.ResourceNotFoundException;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@Slf4j
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public Page<Order> findAll(@RequestParam(name = "page", required = false) Integer page) {
        if (page == null) {
            page = 1;
        }
        log.info("Find orders on page {}", page);
        PageRequest pageRequest = new PageRequest(page - 1, 10, Sort.Direction.DESC, "orderDate");
        return orderRepository.getOrdersByPage(pageRequest);
    }

    @GetMapping("/{id}")
    public Order findOne(@PathVariable Long id) {
        log.info("Find order with id {}", id);
        return Optional.ofNullable(orderRepository.findOne(id))
                .orElseThrow(ResourceNotFoundException::new);
    }
}
