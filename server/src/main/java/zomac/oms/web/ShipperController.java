package zomac.oms.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import zomac.oms.model.Shipper;
import zomac.oms.repository.OrderRepository;
import zomac.oms.repository.ShipperRepository;
import zomac.oms.web.exception.BadRequestException;
import zomac.oms.web.exception.ResourceNotFoundException;
import zomac.oms.web.exception.ResourceRemoveException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shipper")
@Slf4j
public class ShipperController {

    @Autowired
    private ShipperRepository shipperRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Shipper> findAll() {
        log.info("Find all shippers");
        return shipperRepository.findAll();
    }

    @GetMapping("/{id}")
    public Shipper findOne(@PathVariable Long id) {
        log.info("Find shipper with id {}", id);
        return Optional.ofNullable(shipperRepository.findOne(id))
                .orElseThrow(ResourceNotFoundException::new);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Shipper create(@RequestBody @Valid Shipper shipper) {
        log.info("Create new {}", shipper);
        if (shipper.getId() != null) {
            throw new BadRequestException();
        }
        return shipperRepository.save(shipper);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody @Valid Shipper shipper) {
        log.info("Update {}", shipper);
        if (!id.equals(shipper.getId())) {
            throw new BadRequestException();
        }
        shipperRepository.save(shipper);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        log.info("Delete shipper with id {}", id);
        Shipper shipper = shipperRepository.findOne(id);
        if(orderRepository.existsByShipper(shipper)) {
            throw new ResourceRemoveException("Shipper has orders!");
        } else {
            shipperRepository.delete(id);
        }
    }
}
