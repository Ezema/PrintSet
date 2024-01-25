package neworders.service;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

public interface StripeSession {
    Session getSession() throws StripeException;
}
