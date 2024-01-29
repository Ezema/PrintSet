package neworders.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.exception.StripeException;

import neworders.DTO.FilePrintSettingsDTO;
import neworders.service.NewOrderService;
import neworders.service.StripeSessionService;

@Controller
public class UploadsController {
    @Autowired
    NewOrderService newOrderService;
    @PostMapping("/upload")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:1024")
    public String echo1(@RequestPart(value = "file", required = false) List<MultipartFile> listOfMultipartFiles, @RequestPart(value = "filePrintSettings", required = false) String listOfFilePrintSettingsDTOS, @RequestPart(value = "firebaseUserUid", required = true) String firebaseUserUid) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        List<FilePrintSettingsDTO> filePrintSettingsList;
        try {
            filePrintSettingsList = Arrays.asList(mapper.readValue(listOfFilePrintSettingsDTOS, FilePrintSettingsDTO[].class));
        } catch (JsonMappingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }catch (RuntimeException e){
            throw e;
        }


        try{
            String response = StripeSessionService.builder(filePrintSettingsList).build().getSession().toJson();
            // for each file, create an order with their respective settings
            for (int i = 0; i < filePrintSettingsList.size(); i++) {
                newOrderService.createNewOrder(listOfMultipartFiles.get(i),filePrintSettingsList.get(i),firebaseUserUid);
            }
            return response;
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }
}
