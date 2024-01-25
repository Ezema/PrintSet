package neworders.repository;

import neworders.model_entities.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepository extends JpaRepository<OrderEntity,Integer> {
    public List<OrderEntity> findAllOrderEntityByfirebaseUserUid(String firebaseUserUid);
}
