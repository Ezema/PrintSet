package neworders.service;

import neworders.DTO.FilePrintSettingsDTO;
import neworders.model_entities.OrderEntity;
import neworders.repository.OrdersRepository;
import neworders.service.storage.FileSystemStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class NewOrderService {
    private final FileSystemStorageService fileSystemStorageService;
    private final OrdersRepository ordersRepository;

    @Autowired
    public NewOrderService(FileSystemStorageService fileSystemStorageService,OrdersRepository ordersRepository){
        this.fileSystemStorageService = fileSystemStorageService;
        this.ordersRepository = ordersRepository;
    }

    public boolean createNewOrder(MultipartFile file, FilePrintSettingsDTO filePrintSettingsDTO, String firebaseUserUid) throws RuntimeException{
        try {
            //System.out.println("before persistance: "+new OrderEntity(filePrintSettingsDTO).toString());
            ordersRepository.save(new OrderEntity(filePrintSettingsDTO, file.getOriginalFilename(), firebaseUserUid));
        }catch (RuntimeException e){
            throw e;
        }
        return true;
    }
    private boolean storeUpload(MultipartFile multipartFile){
        try {
            fileSystemStorageService.store(multipartFile);
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;

    }
}
