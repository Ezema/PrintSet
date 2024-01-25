package neworders.controller;

import neworders.constants.DotenvLocator;
import neworders.model_entities.OrderEntity;
import neworders.service.GetOrderHistoryService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class HistoryController {

    @Autowired GetOrderHistoryService getOrderHistoryService;
    @Autowired DotenvLocator dotenvLocator;
    @GetMapping(value = "/my-orders")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000")
    public List<OrderEntity> getMyOrders(@RequestHeader(value = "firebaseUserUid") String firebaseUserUid){
        return getOrderHistoryService.getOrderHistoryForUser(firebaseUserUid);
    }
}
