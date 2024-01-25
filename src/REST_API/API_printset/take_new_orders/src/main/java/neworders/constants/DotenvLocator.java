package neworders.constants;


import com.stripe.Stripe;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.Builder;
import org.springframework.stereotype.Component;

@Component
public class DotenvLocator {
    public static Dotenv getInstance(){
        return Dotenv.load();
    }

}
