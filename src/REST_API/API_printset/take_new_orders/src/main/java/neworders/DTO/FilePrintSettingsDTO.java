package neworders.DTO;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@MappedSuperclass
public class FilePrintSettingsDTO implements FilePrintSettings {
    public int numberOfCopies;
    public boolean doubleSided;
    public boolean printInColor;
    public String paperSize;
    public int paperWeight;
    public String paperOrientation;
    public String turnDoubleSidedPrintBy;
    public int pdfNumberOfPages;
    public double pricePerDocument;

    @Override
    public String toString() {
        return "FilePrintSettingsDTO{" +
                ", numberOfCopies=" + numberOfCopies +
                ", doubleSided=" + doubleSided +
                ", printInColor=" + printInColor +
                ", paperSize='" + paperSize + '\'' +
                ", paperWeight=" + paperWeight +
                ", paperOrientation='" + paperOrientation + '\'' +
                ", turnDoubleSidedPrintBy='" + turnDoubleSidedPrintBy + '\'' +
                ", pdfNumberOfPages=" + pdfNumberOfPages +
                ", pricePerDocument=" + pricePerDocument +
                '}';
    }
}
