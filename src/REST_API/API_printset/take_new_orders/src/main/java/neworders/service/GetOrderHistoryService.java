package neworders.service;

import neworders.model_entities.OrderEntity;
import neworders.repository.OrdersRepository;
import neworders.service.storage.FileSystemStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GetOrderHistoryService {
    private final OrdersRepository ordersRepository;

    @Autowired
    public GetOrderHistoryService(OrdersRepository ordersRepository){
        this.ordersRepository = ordersRepository;
    }

    public List<OrderEntity> getOrderHistoryForUser(String firebaseUserUid){
        var response = ordersRepository.findAllOrderEntityByfirebaseUserUid(firebaseUserUid);
        System.out.println(response);
        return response;
    }
}
