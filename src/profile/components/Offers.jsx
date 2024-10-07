import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react'; // Clerk user authentication
import { db } from './../../../configs/firebaseConfig'; // Firebase Firestore config
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore query methods

const Offers = () => {
    const [offers, setOffers] = useState([]); // Store the fetched offers
    const { user } = useUser(); // Get the current logged-in user
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoading(true); // Start loading
                const offersCollectionRef = collection(db, 'offers'); // Reference to offers collection
                
                // Query offers where the ownerId matches the current logged-in user's ID
                const offersQuery = query(offersCollectionRef, where("ownerId", "==", user.primaryEmailAddress.emailAddress.split('@')[0]));
                
                // Fetch the offers from Firestore
                const querySnapshot = await getDocs(offersQuery);
                const offersData = querySnapshot.docs.map(doc => ({
                    id: doc.id, // Get document ID
                    ...doc.data() // Get document data
                }));

                setOffers(offersData); // Store offers in state
                setLoading(false); // Stop loading
            } catch (error) {
                console.error("Error fetching offers:", error);
                setLoading(false); // Stop loading on error
            }
        };

        if (user) {
            fetchOffers(); // Fetch offers once the user is available
        }
    }, [user]);

    if (loading) {
        return <p>Loading offers...</p>; // Show loading state while fetching offers
    }

    if (offers.length === 0) {
        return <p>No offers found for your listings.</p>; // Show a message if no offers are found
    }

    return (
        <div>
            <h2 className="font-bold text-2xl mb-4">Offers for Your Listings</h2>
            {offers.map((offer) => (
                <div key={offer.id} className="border p-4 rounded-md mb-4">
                    <h3 className="font-semibold">Offer from: {offer.senderId}</h3>
                    <p>Offer Price: ₹{offer.offerPrice}</p>
                    <p>Status: {offer.status}</p>
                    <p>Offer Made On: {offer.createdAt.toDate().toLocaleDateString()}</p>
                    {/* You can add more details such as listing reference, sender info, etc. */}
                </div>
            ))}
        </div>
    );
}

export default Offers;
