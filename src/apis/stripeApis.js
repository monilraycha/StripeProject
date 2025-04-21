import axios from "axios";

const createPaymentIntent = async (data) => {
    try {
      const response = await axios.post('http://localhost:4002/payment-sheet', data);
      console.log('PaymentIntent response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating PaymentIntent:', error.response?.data || error.message);
      throw error;
    }
}

export default createPaymentIntent;
