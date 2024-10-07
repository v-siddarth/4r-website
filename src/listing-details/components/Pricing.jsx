import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { MdOutlineLocalOffer } from "react-icons/md";
import { useUser } from '@clerk/clerk-react';
import { CreateSendBirdUser, CreateSendBirdChannel, SendOfferMessage } from '@/Shared/Service'; // Ensure the correct path to your SendBird service
import { useNavigate } from 'react-router-dom';

function Pricing({ carDetail }) {
    const [offerPrice, setOfferPrice] = useState(''); // Store the offer price
    const { user } = useUser(); // Clerk user object
    const navigate = useNavigate();

    const handleMakeOffer = async () => {
        const userId = user.primaryEmailAddress.emailAddress.split('@')[0]; // Current user ID
        const ownerUserId = carDetail?.createdBy.split('@')[0]; // Owner ID from the listing

        try {
            // Step 1: Create Current User in SendBird
            await CreateSendBirdUser(userId, user?.fullName, user?.imageUrl);
            console.log("Current user created:", userId);

            // Step 2: Create Owner User in SendBird
            await CreateSendBirdUser(ownerUserId, carDetail?.userName, carDetail?.userImageUrl);
            console.log("Owner user created:", ownerUserId);

            // Step 3: Create 1-to-1 channel between current user and owner
            const channelResponse = await CreateSendBirdChannel([userId, ownerUserId], carDetail?.listingTitle);
            console.log("Channel Created:", channelResponse);

            // Step 4: Send the offer as a message
            const offerMessage = `The buyer is offering ₹${offerPrice} for your listing: ${carDetail?.listingTitle}`;
            await SendOfferMessage(channelResponse.channel_url, offerMessage);

            // Step 5: Navigate to inbox after sending the offer
            navigate('/profile');
        } catch (error) {
            console.error("Error sending the offer:", error.message);
        }
    };

    return (
        <div className='p-10 rounded-xl border shadow-md'>
            <h2>Our Price</h2>
            <h2 className='font-bold text-4xl'>₹{carDetail?.sellingPrice}</h2>

            {/* Input field for entering the offer price */}
            <input
                type="number"
                className="w-full mt-4 p-2 border rounded-lg"
                placeholder="Enter your offer price"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
            />

            {/* Button to submit the offer */}
            <Button className="w-full mt-7" size="lg" onClick={handleMakeOffer}>
                <MdOutlineLocalOffer className='text-lg mr-2' /> Make an Offer Price
            </Button>
        </div>
    );
}

export default Pricing;
