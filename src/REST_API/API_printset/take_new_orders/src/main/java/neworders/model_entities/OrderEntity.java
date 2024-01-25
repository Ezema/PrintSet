package neworders.model_entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import neworders.DTO.FilePrintSettingsDTO;

import java.sql.Date;

@Entity
@Table(name = "orders")
public class OrderEntity extends FilePrintSettingsDTO{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String filename;
    String firebaseUserUid;
    public OrderEntity(FilePrintSettingsDTO filePrintSettingsDTO, String filename, String firebaseUserUid) {
        super(filePrintSettingsDTO.numberOfCopies,filePrintSettingsDTO.doubleSided,filePrintSettingsDTO.printInColor,filePrintSettingsDTO.paperSize,filePrintSettingsDTO.paperWeight,filePrintSettingsDTO.paperOrientation,filePrintSettingsDTO.turnDoubleSidedPrintBy,filePrintSettingsDTO.pdfNumberOfPages,filePrintSettingsDTO.pricePerDocument);
        this.filename = filename;
        this.firebaseUserUid = firebaseUserUid;

    }
    public OrderEntity(int numberOfCopies, boolean doubleSided, boolean printInColor, String paperSize, int paperWeight, String paperOrientation, String turnDoubleSidedPrintBy, int pdfNumberOfPages, double pricePerDocument) {
        super(numberOfCopies, doubleSided, printInColor, paperSize, paperWeight, paperOrientation, turnDoubleSidedPrintBy, pdfNumberOfPages, pricePerDocument);
    }

    public OrderEntity() {
        super();
    }
}
