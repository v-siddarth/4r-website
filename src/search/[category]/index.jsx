import Header from '@/components/Header';
import Search from '@/components/Search';
import { db } from './../../../configs/firebaseConfig'; // Import Firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firebase Firestore imports
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function SearchByCategory() {
    const { category } = useParams(); // Get category from URL params
    const [wasteList, setWasteList] = useState([]);

    useEffect(() => {
        if (category) {
            fetchWasteList(); // Fetch waste list when category changes
        }
    }, [category]);

    // Function to fetch waste listings based on the category from Firebase
    const fetchWasteList = async () => {
        try {
            const listingCollectionRef = collection(db, 'listings'); // Reference to the listings collection
            const wasteQuery = query(listingCollectionRef, where("category", "==", category)); // Query by category

            // Fetch data from Firestore
            const data = await getDocs(wasteQuery);
            const formattedData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setWasteList(formattedData); // Set the state with fetched data
        } catch (error) {
            console.error("Error fetching waste listings: ", error);
        }
    };

    return (
        <div>
            <Header />

            {/* Search Component */}
            <div className="p-16 bg-black flex justify-center">
                <Search />
            </div>

            {/* Display Results */}
            <div className="p-10 md:px-20">
                <h2 className="font-bold text-4xl ">{category}</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
                    {wasteList?.length > 0 ? (
                        wasteList.map((listing, index) => (
                            <div key={index} className="rounded-xl bg-white border hover:shadow-md cursor-pointer relative">
                                {/* Product Image */}
                                <img
                                    src={listing?.images && listing.images.length > 0 ? listing.images[0] : ''}
                                    width={'100%'}
                                    height={250}
                                    className="rounded-t-xl h-[180px] object-cover"
                                    alt={listing?.listingTitle || 'Product Image'}
                                />

                                <div className="p-4">
                                    {/* Listing Title */}
                                    <h2 className="font-bold text-black text-lg mb-2">{listing?.listingTitle}</h2>

                                    <div className="grid md:grid-cols-3 mt-5">
                                        <div className="flex flex-col items-center">
                                            <h2>{listing?.tagline || 'No Tagline'}</h2>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <h2>Selling: ${listing?.sellingPrice || 'N/A'}</h2>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <h2>Category: {listing?.category || 'N/A'}</h2>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between mt-4">
                                        <h2 className="font-bold text-xl">
                                            ${listing?.sellingPrice || 'N/A'}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-full">
                            <h3>No products found in this category</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchByCategory;
