import { Button } from '@/components/ui/button';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'; // Import Firebase functions
import { useUser } from '@clerk/clerk-react'; // Clerk hook for user info
import { db } from './../../../configs/firebaseConfig'; // Firebase configuration
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation

function MyListing() {
    const { user } = useUser(); // Get logged-in user's data from Clerk
    const [carList, setCarList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            GetUserWasteListing(); // Fetch user-specific listings after user is available
        }
    }, [user]);

    const GetUserWasteListing = async () => {
        try {
            const listingCollectionRef = collection(db, 'listings'); // Reference to 'listings' collection

            // Query listings where userName matches the logged-in user's full name or username
            const userQuery = query(listingCollectionRef, where("userName", "==", user.fullName || user.username));

            // Fetch data from Firestore
            const data = await getDocs(userQuery);

            // Format and set the data
            const formattedData = data.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().listingTitle,
                category: doc.data().category,
                images: doc.data().images,
            }));

            setCarList(formattedData); // Store the fetched listings in state
        } catch (error) {
            console.error("Error fetching user-specific listings: ", error);
        }
    };

    // Delete Listing
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'listings', id)); // Delete the document from Firestore
            setCarList(carList.filter((item) => item.id !== id)); // Remove from local state
        } catch (error) {
            console.error("Error deleting listing: ", error);
        }
    };

    // Edit Listing (navigate to form)
    const handleEdit = (id) => {
        navigate(`/add-listing?mode=edit&id=${id}`); // Navigate to the existing add-listing page with edit mode
    };

    return (
        <div className='mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-4xl'>My Listings</h2>
                <Link to={'/add-listing'}>
                    <Button>+ Add New Listing</Button>
                </Link>
            </div>

            {/* Grid of user-specific listings */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5'>
                {carList.map((item, index) => (
                    <div key={index} className='p-4 border rounded-lg'>
                        <h3 className='font-bold'>{item.title}</h3>
                        <p className='text-gray-500'>{item.category}</p>

                        {/* Display Images */}
                        {item.images?.length > 0 && (
                            <div className='mt-2'>
                                <img src={item.images[0]} alt="Listing" className='rounded-lg w-full h-[150px] object-cover' />
                            </div>
                        )}

                        <div className='p-2 bg-gray-50 rounded-lg flex justify-between gap-3 mt-3'>
                            {/* Edit Button */}
                            <Button variant="outline" className="w-full" onClick={() => handleEdit(item.id)}>
                                Edit
                            </Button>

                            {/* Delete Button */}
                            <Button variant="destructive" className="w-full" onClick={() => handleDelete(item.id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyListing;
