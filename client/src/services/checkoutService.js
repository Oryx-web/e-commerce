import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const createCheckoutSession = async (cartItems) => {
  const res = await axios.post(`${API_URL}/create-checkout-session`, { cartItems });
  return res.data;
};