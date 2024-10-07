import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { MdOutlineLocalOffer } from "react-icons/md";
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { db } from './../../../configs/firebaseConfig'; // Ensure correct Firebase config import
import { collection, addDoc, Timestamp } from 'firebase/firestore'; // Firestore methods
import { BiLoaderAlt } from "react-icons/bi"; // Import the loading spinner icon

function Pricing({ carDetail }) {
    const [offerPrice, setOfferPrice] = useState(''); // Store the offer price
    const { user } = useUser(); // Clerk user object
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false); // Loading state

    // Function to handle making an offer
    const handleMakeOffer = async () => {
        setLoader(true); // Start loading
        const userId = user.primaryEmailAddress.emailAddress.split('@')[0]; // Current user ID
        const ownerUserId = carDetail?.createdBy.split('@')[0]; // Owner ID from the listing

        try {
            // Step 1: Add offer data to the "offers" collection in Firebase
            const offersCollectionRef = collection(db, 'offers');
            await addDoc(offersCollectionRef, {
                senderId: userId,  // User who is making the offer
                ownerId: ownerUserId,  // Owner who will receive the offer
                offerPrice: offerPrice,  // Price being offered
                status: 'pending',  // Offer status (pending, accepted, rejected)
                createdAt: Timestamp.now(),  // Timestamp of when the offer was made
            });

            console.log("Offer successfully added to Firebase");

            // Step 2: Redirect to profile or offer confirmation page after submission
            navigate('/profile');
        } catch (error) {
            console.error("Error adding offer to Firebase:", error);
        } finally {
            setLoader(false); // Stop loading
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
            <Button className="w-full mt-7" size="lg" onClick={handleMakeOffer} disabled={loader}>
                {loader ? <BiLoaderAlt className="animate-spin mr-2" /> : null}
                <MdOutlineLocalOffer className='text-lg mr-2' /> Make an Offer Price
            </Button>
        </div>
    );
}

export default Pricing;
