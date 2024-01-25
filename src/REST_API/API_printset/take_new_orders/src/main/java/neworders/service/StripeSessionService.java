package neworders.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.Builder;
import neworders.DTO.FilePrintSettingsDTO;
import neworders.constants.DotenvLocator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Builder(builderMethodName = "hiddenBuilder")
public class StripeSessionService implements StripeSession {

    private List<FilePrintSettingsDTO> listOfFilePrintSettingsDTOS;


    public static StripeSessionServiceBuilder builder(List<FilePrintSettingsDTO> listOfFilePrintSettingsDTOS) {
        return hiddenBuilder().listOfFilePrintSettingsDTOS(listOfFilePrintSettingsDTOS);
    }
    @Override
    public Session getSession() throws StripeException {
        Stripe.apiKey = DotenvLocator.getInstance().get("STRIPE_APIKEY");

        ArrayList<SessionCreateParams.LineItem> listOfPrintingRequests = new ArrayList<SessionCreateParams.LineItem>();
        int index=1;
        Double grandTotal=0.0;
        for (FilePrintSettingsDTO listOfFilePrintSettingsDTO : listOfFilePrintSettingsDTOS) {
            listOfPrintingRequests.add(
                    SessionCreateParams.LineItem.builder()
                            .setQuantity((long) listOfFilePrintSettingsDTO.getNumberOfCopies())
                            .setPriceData(SessionCreateParams.LineItem.PriceData.builder().setCurrency("eur").setUnitAmount(Double.valueOf((listOfFilePrintSettingsDTO.getPricePerDocument()*100)/listOfFilePrintSettingsDTO.getNumberOfCopies()).longValue()).setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder().setName("Document "+index).build()).build())
                            .build()

            );
            grandTotal+=(long) listOfFilePrintSettingsDTO.getNumberOfCopies()*Double.valueOf((listOfFilePrintSettingsDTO.getPricePerDocument()*100)/listOfFilePrintSettingsDTO.getNumberOfCopies()).longValue();
            index++;
        }

        // The following is for prototyping purposes, Stripe demands a minimum transaction value of USD 0.50 (50 cents)
        SessionCreateParams params;
        if((grandTotal/100)<0.6){
            params = SessionCreateParams.builder().setSuccessUrl("http://localhost:3000?success=true")
                    .setCancelUrl("http://localhost:3000?canceled=true").addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(SessionCreateParams.LineItem.PriceData.builder().setCurrency("eur").setUnitAmount(100L).setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder().setName("Document 1").build()).build())
                                    .build()
                    ).setMode(SessionCreateParams.Mode.PAYMENT).build();
        }else {
            params = SessionCreateParams.builder()
                            .setSuccessUrl("http://localhost:3000?success=true")
                            .setCancelUrl("http://localhost:3000?canceled=true")
                            .addAllLineItem(listOfPrintingRequests)
                            .setMode(SessionCreateParams.Mode.PAYMENT)
                            .build();
        }
        return Session.create(params);
    }


}
