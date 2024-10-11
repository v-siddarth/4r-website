import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import DetailHeader from '../components/DetailHeader';
import { useParams } from 'react-router-dom';
import { db } from './../../../configs/firebaseConfig'; // Firebase config
import { doc, getDoc } from 'firebase/firestore'; // Firebase Firestore methods
import ImageGallery from '../components/ImageGallery';
import Description from '../components/Description';
import Features from '../components/Features';
import Footer from '@/components/Footer';
import Pricing from '../components/Pricing';
import Specification from '../components/Specification';
import OwnersDetail from '../components/OwnersDetail';
import AddressComponent from '../components/AddressComponent';
import MostSearchedWaste from '@/components/MostSearchedWaste';


function ListingDetail() {
    const { id } = useParams(); // Get listing ID from URL params
    const [wasteDetails, setwasteDetails] = useState(null); // Store listing details

    useEffect(() => {
        getListingDetails(); // Fetch listing details when component mounts
    }, []);

    const getListingDetails = async () => {
        try {
            const listingDocRef = doc(db, 'listings', id); // Reference to the document in 'listings' collection
            const listingDoc = await getDoc(listingDocRef); // Fetch document

            if (listingDoc.exists()) {
                setwasteDetails(listingDoc.data()); // Set wasteDetails with fetched data
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error("Error fetching car details:", error);
        }
    };

    return (
        <div>
            <Header />

            <div className='p-10 md:px-20'>
                {/* Header Detail Component */}
                <DetailHeader wasteDetails={wasteDetails} />

                <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
                    {/* Left Section */}
                    <div className='md:col-span-2 '>
                        {/* Image Gallery */}
                        <ImageGallery wasteDetails={wasteDetails} />

                        {/* Description */}
                        <Description wasteDetails={wasteDetails} />

                        {/* Features List */}
                        <Features features={wasteDetails?.features} />

                        {/* Address Component */}
                        <AddressComponent address={wasteDetails?.address} /> {/* Pass only the 'address' field */}
                    </div>

                    {/* Right Section */}
                    <div>
                        {/* Pricing */}
                        <Pricing wasteDetails={wasteDetails} />

                        {/* Car Specification */}
                        <Specification wasteDetails={wasteDetails} />

                        {/* Owners Details */}
                        <OwnersDetail wasteDetails={wasteDetails} />
                    </div>
                </div>

                <MostSearchedWaste />
            </div>

            <Footer />
        </div>
    );
}

export default ListingDetail;
