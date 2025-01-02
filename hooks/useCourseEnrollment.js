import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { API_URL, API_ENDPOINTS } from '../api/config';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export const useCourseEnrollment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const enrollInCourse = async (courseId) => {
    try {
      setLoading(true);
      setError(null);

      // Get payment intent
      const response = await fetch(`${API_URL}${API_ENDPOINTS.COURSES.ENROLL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate enrollment');
      }

      const { clientSecret } = await response.json();

      // Handle payment
      const stripe = await stripePromise;
      const result = await stripe.confirmCardPayment(clientSecret);

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.paymentIntent;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { enrollInCourse, loading, error };
};