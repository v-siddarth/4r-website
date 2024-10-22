/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Separator } from './ui/separator';
import { FaTag, FaDollarSign, FaBoxes } from "react-icons/fa";
// import { MdOpenInNew } from "react-icons/md";

import { Link } from 'react-router-dom';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from '../../configs/firebaseConfig'; // Import Firebase configuration
import { collection, query, orderBy, limit, getDocs, doc } from 'firebase/firestore';

function MostSearchedWaste() {
    const [wasteList, setwasteList] = useState([]);

    useEffect(() => {
        GetPopularwasteList();
    }, []);

    const GetPopularwasteList = async () => {
        const listingCollectionRef= collection(db, 'listings');
        const data = await getDocs(listingCollectionRef);
        console.log("Fetched Data: ", data); 
        setwasteList(data.docs.map((doc) => ({...doc.data(),id: doc.id})));
    };

    return (
      <div className='mx-24 hidden md:block'>
          <h2 className='font-bold text-3xl text-center mt-16 mb-7'>Most Searched Products</h2>
          <Carousel>
              <CarouselContent>
                  {wasteList.map((listing, index) => (
                      <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <Link to={'/listing-details/' + listing?.id}>
                <div className='rounded-xl bg-white border hover:shadow-md cursor-pointer relative'>
                    
                    {/* Product Image */}
                    <img 
                        src={listing?.images && listing.images.length > 0 ? listing.images[0].imageUrl || listing.images[0] : ''} 
                        width={'100%'} 
                        height={250} 
                        className='rounded-t-xl h-[180px] object-cover' 
                        alt={listing?.listingTitle || 'Product Image'} 
                    />

                    <div className='p-4'>
                        {/* Listing Title */}
                        <h2 className='font-bold text-black text-lg mb-2'>{listing?.listingTitle}</h2>

                        <Separator />

                        {/* Tagline, Selling Price, Category */}
                        <div className='grid md:grid-cols-3 mt-5'>
                            <div className='flex flex-col items-center'>
                                <FaTag className='text-lg mb-2' />
                                <h2>{listing?.tagline || 'No Tagline'}</h2>
                            </div>
                            <div className='flex flex-col items-center'>
                                <FaDollarSign className='text-lg mb-2' />
                                <h2>Selling: ₹{listing?.sellingPrice || 'N/A'}</h2>
                            </div>
                            <div className='flex flex-col items-center'>
                                <FaBoxes className='text-lg mb-2' />
                                <h2>Category: {listing?.category || 'N/A'}</h2>
                            </div>
                        </div>

                        <Separator className="my-2" />

                        {/* Price and View Details */}
                        <div className='flex items-center justify-between'>
                            <h2 className='font-bold text-xl'>₹{listing?.sellingPrice || 'N/A'}</h2>
                            <h2 className='text-primary text-sm flex gap-2 items-center'>
                                View Details
                            </h2>
                        </div>
                    </div>
                </div>
            </Link>
                      </CarouselItem>  
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
          </Carousel>
      </div>
  );
  
}

export default MostSearchedWaste;
