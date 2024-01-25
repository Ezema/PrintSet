package neworders;

import neworders.constants.DotenvLocator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class TakeNewOrdersApplication {

	public static void main(String[] args) {SpringApplication.run(TakeNewOrdersApplication.class, args);}

}
