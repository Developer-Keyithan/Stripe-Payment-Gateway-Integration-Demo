import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../../app/globals.css'

const Success = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();
  const { payment_intent, amount, redirect_status, orderId, userId } = router.query;

  useEffect(() => {
    // if (redirect_status !== 'succeeded') {
    // router.push(`/payment?a=${amount}&o=${orderId}&u=${userId}`);
    // }
    const fetchUser = async () => {
      // const cookieResponse = await axios.get('/api/cookie');

      // if (cookieResponse.status !== 200) {
      //   router.push(`/payment?a=${amount}&o=${orderId}&u=${userId}`);
      // }

      try {
        const userAPIResponse = await axios.post('/api/user/get-user', { userId: userId });
        const user = userAPIResponse.data?.user;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setTimeout(() => {
          router.push('/dashboard');
        }, 5000);
      } catch (error) {
        console.error(error);
        // router.push(`/payment?a=${amount}&o=${orderId}&u=${userId}`);
      }

      // if (res.status !== 200) {
      //   router.push('/payment');
      // }
    }
    fetchUser();
  }
    , [redirect_status, userId, orderId, amount, router]);
  return (
    <div className='min-h-screen flex items-center justify-center shadow-2xl animate-fade-in-scale'>
      <div className='px-20 py-40 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-primaryColor to-primaryButtonColor'>
        <h1 className='text-6xl font-semibold'>💳💵🎉 Payment Succeeded</h1>
        <div className='mt-32'>
          <p className='text-3xl'>Thank you, <span className='font-semibold text-4xl'>{firstName} {lastName}!</span>💖🌟,</p>
          <p className='text-3xl mt-8'> for your generous payment of <span className='font-semibold text-4xl'>LKR {amount}</span> 💳💵 in support of the farmers 🌾🚜.</p>
        </div>
        <p>Payment ID: {payment_intent}</p>
        <p>Amount: {amount}</p>
        <p>Status: {redirect_status}</p>
        <p>Order ID: {orderId}</p>
        <p>User ID: {userId}</p>
      </div>
    </div>
  );
};

export default Success;