import { currentUser } from '@clerk/nextjs/server';
import { toast } from 'react-toastify';
import { handleCheckout } from 'src/actions/checkoutStripe'
import { handlepayment } from 'src/actions/order';

interface Props {}

// interface orderDetails {
//     startRank: string,
//     startDivision: number,
//     endRank: string,
//     endDivision: number,
//     server: string,
//     lpRange: string,
//     boostType: string,
//     result: number,
//   }

// const handleGetPayment = async () => {
//     const user = await currentUser();
//     try {
//         await connectToDatabase();
//         const customer = await User.findOne({clerkId: user?.id});
//         if(customer.orderId !== "" && customer.orderId) {
//             toast.error("You Already Have An Order")
//         } else {
//             handlepayment(startRank, startDivision, endRank, endDivision, server, lpRange,boostType, spells, offlineVpn, encryption, result)
//         }
//     } catch (error) {
        
//     }
// }

const PaymentForm =  ({startRank, startDivision, endRank, endDivision, server, lpRange,boostType, spells, offlineVpn, priorityOrder, queueType, result }: {
    startRank: string,
    startDivision: number,
    endRank: string,
    endDivision: number,
    server: string,
    lpRange: string,
    boostType: string,
    spells: boolean,
    offlineVpn: boolean,
    priorityOrder: boolean,
    queueType: string,
    result: number,
  }) => {

    const handleGetPayment = async () => {
        const res = await handlepayment(startRank, startDivision, endRank, endDivision, server, lpRange,boostType, spells, offlineVpn, priorityOrder, queueType, result);
        if(res.message && res.status === 400) {
            toast.error(res.message)
        } else {
            toast.error("Something Went Wrong...")
        }
    }

  return (
      // <button className='w-[85%] rounded-lg text-white text-2xl bg-blue-600 h-[45px] max-md:h-[35px] mx-auto blue-glow-button' >Buy Now</button>
    <form  className='flex justify-center' action={() => handleGetPayment()}>
        <button className='w-[85%] rounded-lg text-white text-2xl bg-blue-600 h-[45px] max-md:h-[35px] mx-auto blue-glow-button' type='submit' role="link">Buy Now</button>
    </form>
)
}

export default PaymentForm