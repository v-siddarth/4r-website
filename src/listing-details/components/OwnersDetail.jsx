import { CreateSendBirdUser, CreateSendBirdChannel } from '@/Shared/Service'; // Import functions from Service.jsx
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function OwnersDetail({ carDetail }) {
  const { user } = useUser(); // Clerk user object
  const navigation = useNavigate(); // For navigation after channel creation
  
  const OnMessageOwnerButtonClick = async () => {
    const userId = user.primaryEmailAddress.emailAddress.split('@')[0]; // Current user ID
    const ownerUserId = carDetail?.createdBy.split('@')[0]; // Owner ID from the listing

    try {
      // Step 1: Create Current User in SendBird
      await CreateSendBirdUser(userId, user?.fullName, user?.imageUrl).then(resp=>{
        console.log(resp)
      });
    } catch (error) {
      console.error("Error occurred while messaging the owner:", error.message);
    }  
    try{
      // Step 2: Create Owner User in SendBird
      await CreateSendBirdUser(ownerUserId, carDetail?.userName, carDetail?.userImageUrl);
      console.log("Owner user created:", ownerUserId);
    }catch (error) {
      console.error("Error occurred while messaging the owner:", error.message);
    
      try{
      // Step 3: Create 1-to-1 channel between current user and owner
      const channelResponse = await CreateSendBirdChannel([userId, ownerUserId], carDetail?.listingTitle);
      console.log("Channel Created:", channelResponse);
      }
      catch (error) {
        console.error("Error occurred while messaging the owner:", error.message);
      }
      // Step 4: Navigate to inbox after channel creation
      navigation('/profile');
    } 
  }

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
      <h2 className='font-medium text-2xl mb-3'>Owner/ Deals</h2>
      <img src={carDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full'/>
      <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
      <h2 className='mt-2 text-gray-500'>{carDetail?.createdBy}</h2>

      <Button className="w-full mt-6" onClick={OnMessageOwnerButtonClick}>
        Message Owner
      </Button>
    </div>
  )
}

export default OwnersDetail;
