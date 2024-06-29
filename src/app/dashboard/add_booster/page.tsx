"use server";
import AddBooster from 'src/components/dashboard/Add_booster/AddBooster';
import { redirect } from 'next/navigation';
import { auth, currentUser} from '@clerk/nextjs';
import { connectToDatabase } from 'src/lib/database/mongoose';
import Admin from 'src/lib/database/models/admins.model';

interface Props {}

const page = async () => {
    const isUserLogged =  auth();
    if (!isUserLogged) {
      redirect('/sign-in');
    }
    try {
      await connectToDatabase()
    } catch (error) {
     console.log('failed to connect to the database!')
    }
    const userClerkId = await currentUser();
    const detectUser =  await Admin.findOne({clerkId: userClerkId?.id});
    if (!detectUser) {
      redirect('/')
    }
  return <AddBooster />
}

export default page