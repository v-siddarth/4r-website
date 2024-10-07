import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react'; // Clerk user authentication
import { db } from './../../../configs/firebaseConfig'; // Firebase Firestore config
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'; // Firestore methods

const Offers = () => {
    const [sentOffers, setSentOffers] = useState([]); // Store offers sent by the user
    const [receivedOffers, setReceivedOffers] = useState([]); // Store offers received by the user
    const { user } = useUser(); // Get the current logged-in user
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch offers sent by the user and offers received by the user
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoading(true); // Start loading
                const offersCollectionRef = collection(db, 'offers');

                // Query offers sent by the user (where senderId matches the current user)
                const sentOffersQuery = query(offersCollectionRef, where("senderId", "==", user.primaryEmailAddress.emailAddress.split('@')[0]));
                const sentOffersSnapshot = await getDocs(sentOffersQuery);
                const sentOffersData = sentOffersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSentOffers(sentOffersData); // Set sent offers

                // Query offers received by the user (where ownerId matches the current user)
                const receivedOffersQuery = query(offersCollectionRef, where("ownerId", "==", user.primaryEmailAddress.emailAddress.split('@')[0]));
                const receivedOffersSnapshot = await getDocs(receivedOffersQuery);
                const receivedOffersData = receivedOffersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setReceivedOffers(receivedOffersData); // Set received offers

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

    // Function to handle accept or reject offers
    const handleOfferStatusChange = async (offerId, newStatus) => {
        try {
            const offerDocRef = doc(db, "offers", offerId); // Reference to the specific offer
            await updateDoc(offerDocRef, {
                status: newStatus // Update the status to "accepted" or "rejected"
            });
            console.log(`Offer ${newStatus}`);
            // After status change, you can refresh offers or handle it in the UI
        } catch (error) {
            console.error("Error updating offer status:", error);
        }
    };

    if (loading) {
        return <p>Loading offers...</p>; // Show loading state while fetching offers
    }

    return (
        <div>
            <h2 className="font-bold text-2xl mb-4">Offers</h2>

            {/* Offers you sent to others */}
            <div>
                <h3 className="font-bold text-xl mb-4">Offers You Sent</h3>
                {sentOffers.length === 0 ? (
                    <p>You haven't sent any offers yet.</p>
                ) : (
                    sentOffers.map((offer) => (
                        <div key={offer.id} className="border p-4 rounded-md mb-4">
                            <h3 className="font-semibold">Offer for Listing: {offer.listingId}</h3>
                            <p>Offer Price: ₹{offer.offerPrice}</p>
                            <p>Status: {offer.status}</p>
                            <p>Sent On: {offer.createdAt.toDate().toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>

            <hr className="my-6" />

            {/* Offers you received from others */}
            <div>
                <h3 className="font-bold text-xl mb-4">Offers You Received</h3>
                {receivedOffers.length === 0 ? (
                    <p>No offers received yet.</p>
                ) : (
                    receivedOffers.map((offer) => (
                        <div key={offer.id} className="border p-4 rounded-md mb-4">
                            <h3 className="font-semibold">Offer from: {offer.senderId}</h3>
                            <p>Offer Price: ₹{offer.offerPrice}</p>
                            <p>Status: {offer.status}</p>
                            <p>Offer Made On: {offer.createdAt.toDate().toLocaleDateString()}</p>
                            
                            {/* Buttons to accept or reject the offer */}
                            {offer.status === 'pending' && (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleOfferStatusChange(offer.id, 'accepted')}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleOfferStatusChange(offer.id, 'rejected')}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Offers;
