import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Search from '@/components/Search'; // Importing the Search component
import { FaTag, FaDollarSign, FaBoxes } from "react-icons/fa";
import { Link, useSearchParams } from 'react-router-dom';
import { db } from './../../configs/firebaseConfig'; // Import Firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Separator } from '../components/ui/separator'; // Import Separator

function SearchByOptions() {
    const [searchParams] = useSearchParams(); // Extract search parameters
    const [carList, setCarList] = useState([]);

    const category = searchParams.get('category'); // Get selected category from URL

    useEffect(() => {
        GetCarList(); // Fetch car list on load or when category changes
    }, [category]);

    const GetCarList = async () => {
        // Construct the query based on the selected category
        let listingCollectionRef = collection(db, 'listings');
        let carQuery = query(listingCollectionRef);
        
        // Apply category filter if present
        if (category) {
            carQuery = query(listingCollectionRef, where("category", "==", category));
        }

        // Fetch data from Firestore
        const data = await getDocs(carQuery);
        setCarList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    return (
        <div>
            <Header />

            {/* Search Component */}
            <div className='p-16 bg-black flex justify-center'>
                <Search />
            </div>

            {/* Search Results */}
            <div className='p-10 md:px-20'>
                <h2 className='font-bold text-4xl '>Search Result</h2>

                {/* List of CarList */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
                    {carList?.length > 0 ? carList.map((listing, index) => (
                        <div key={index}>
                            <Link to={'/listing-details/' + listing?.id}>
                                <div className='rounded-xl bg-white border hover:shadow-md cursor-pointer relative'>
                                    <img 
                                        src={listing?.images && listing.images.length > 0 ? listing.images[0].imageUrl || listing.images[0] : ''} 
                                        width={'100%'} 
                                        height={250} 
                                        className='rounded-t-xl h-[180px] object-cover' 
                                        alt={listing?.listingTitle || 'Product Image'} 
                                    />
                                    <div className='p-4'>
                                        <h2 className='font-bold text-black text-lg mb-2'>{listing?.listingTitle}</h2>
                                        <Separator />
                                        <div className='grid md:grid-cols-3 mt-5'>
                                            <div className='flex flex-col items-center'>
                                                <FaTag className='text-lg mb-2' />
                                                <h2>{listing?.tagline || 'No Tagline'}</h2>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <FaDollarSign className='text-lg mb-2' />
                                                <h2>Selling: ${listing?.sellingPrice || 'N/A'}</h2>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <FaBoxes className='text-lg mb-2' />
                                                <h2>Category: {listing?.category || 'N/A'}</h2>
                                            </div>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className='flex items-center justify-between'>
                                            <h2 className='font-bold text-xl'>${listing?.sellingPrice || 'N/A'}</h2>
                                            <h2 className='text-primary text-sm flex gap-2 items-center'>
                                                View Details
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )) : (
                        <div className="text-center w-full">
                            <h3>No products found in this category</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchByOptions;
