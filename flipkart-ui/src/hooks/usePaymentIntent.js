import axios from "axios";
import { useEffect } from "react";

export default function usePaymentIntent(amount, currency, dependencies) {
  const [clientSecret, setClientSecret] = useState(null);
  useEffect(() => {
    axios
      .post(
        `/api/product-management/create-payment-intent?amount=${amount}&currency=${currency}`
      )
      .then((response) => {
        const data = response.text();
        console.log("data is ....", data);
        setClientSecret(data);
      });
  }, [...dependencies]);
  return clientSecret;
}
