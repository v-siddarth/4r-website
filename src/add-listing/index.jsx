/* eslint-disable no-unused-vars */
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import productDetails from './../Shared/productDetails.json'; // Updated JSON
import features from './../Shared/features.json'; // Updated features.json for waste reuse
import InputField from './components/InputField';
import DropdownField from './components/DropdownField';
import TextAreaField from './components/TextAreaField';
import IconField from './components/IconField';
import UploadImages from './components/UploadImages';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { db } from './../../configs/firebaseConfig'; // Updated import
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import moment from 'moment';

function AddListing() {
    const [formData, setFormData] = useState({});
    const [featuresData, setFeaturesData] = useState({});
    const [triggerUploadImages, setTriggerUploadImages] = useState(null);
    const [searchParams] = useSearchParams();
    const [loader, setLoader] = useState(false);
    const [listingInfo, setListingInfo] = useState(null);
    const [address, setAddress] = useState({
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: '',
    }); // Structured address state
    const navigate = useNavigate();
    const { user } = useUser();

    const mode = searchParams.get('mode');
    const recordId = searchParams.get('id');

    useEffect(() => {
        if (mode === 'edit' && recordId) {
            getListingDetail();
        }
    }, [mode, recordId]);

    const getListingDetail = async () => {
        try {
            const listingRef = doc(db, "listings", recordId);
            const listingSnap = await getDoc(listingRef);

            if (listingSnap.exists()) {
                const data = listingSnap.data();
                setListingInfo(data);
                setFormData(data);
                setFeaturesData(data.features || {});
                if (data.address) {
                    setAddress(data.address); // Set structured address from existing data
                }
            } else {
                toast.error("Listing not found");
                navigate('/profile');
            }
        } catch (error) {
            console.error("Error fetching listing: ", error);
            toast.error("Failed to fetch listing details");
        }
    }

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleFeatureChange = (name, value) => {
        setFeaturesData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetch(`https://api.locationiq.com/v1/reverse.php?key=YOUR_API_KEY&lat=${latitude}&lon=${longitude}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        const addressComponents = {
                            line1: data.display_name.split(",")[0], // First line of address
                            line2: data.display_name.split(",")[1] || '', // Second line if available
                            city: data.address.city || data.address.town || data.address.village || '',
                            state: data.address.state || '',
                            pincode: data.address.postcode || '',
                        };
                        setAddress(addressComponents);
                    })
                    .catch(error => {
                        console.error("Error fetching location: ", error);
                        toast.error("Failed to fetch current location");
                    });
            }, (error) => {
                console.error("Geolocation error: ", error);
                toast.error("Unable to retrieve your location");
            });
        } else {
            toast.error("Geolocation is not supported by this browser");
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        toast('Please Wait...');

        const listingData = {
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress || 'Anonymous',
            userName: user?.fullName || 'Anonymous',
            userImageUrl: user?.imageUrl || '',
            postedOn: moment().format('DD/MM/YYYY'),
            address, // Include structured address
        };

        try {
            if (mode === 'edit' && recordId) {
                const listingRef = doc(db, "listings", recordId);
                await updateDoc(listingRef, listingData);
                toast.success("Listing updated successfully");
                navigate('/profile');
            } else {
                const docRef = await addDoc(collection(db, "listings"), listingData);
                toast.success("Listing created successfully");
                setTriggerUploadImages(docRef.id);
            }
        } catch (error) {
            console.error("Error saving listing: ", error);
            toast.error("Failed to save listing. Please check required fields.");
        } finally {
            setLoader(false);
        }
    }

    return (
        <div>
            <Header />
            <div className='px-10 md:px-20 my-10'>
                <h2 className='font-bold text-4xl'>Add New Listing</h2>
                <form className='p-10 border rounded-xl mt-10' onSubmit={onSubmit}>
                    <div>
                        <h2 className='font-medium text-xl mb-6'>Product Details</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {productDetails.productDetails.map((item, index) => (
                                <div key={index}>
                                    <label className='text-sm flex gap-2 items-center mb-1'>
                                        <IconField icon={item?.icon} />
                                        {item?.label} {item.required && <span className='text-red-500'>*</span>}
                                    </label>
                                    {item.fieldType === 'text' || item.fieldType === 'number' ? (
                                        <InputField item={item} handleInputChange={handleInputChange} listingInfo={listingInfo} />
                                    ) : item.fieldType === 'dropdown' ? (
                                        <DropdownField item={item} handleInputChange={handleInputChange} listingInfo={listingInfo} />
                                    ) : item.fieldType === 'textarea' ? (
                                        <TextAreaField item={item} handleInputChange={handleInputChange} listingInfo={listingInfo} />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Separator className="my-6" />
                    <div>
                        <h2 className='font-medium text-xl my-6'>Features</h2>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                            {features.features.map((item, index) => (
                                <div key={index} className='flex gap-2 items-center'>
                                    <Checkbox
                                        onCheckedChange={(value) => handleFeatureChange(item.name, value)}
                                        checked={featuresData?.[item.name] || false}
                                    /> <h2>{item.label}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* User Address Input */}
                    <Separator className="my-6" />
                    <div>
                        <h2 className='font-medium text-xl mb-6'>User Address</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div>
                                <label className='text-sm mb-1'>Address Line 1</label>
                                <input
                                    type="text"
                                    value={address.line1}
                                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                                    placeholder="Enter Address Line 1"
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div>
                                <label className='text-sm mb-1'>Address Line 2</label>
                                <input
                                    type="text"
                                    value={address.line2}
                                    onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                                    placeholder="Enter Address Line 2"
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div>
                                <label className='text-sm mb-1'>City</label>
                                <input
                                    type="text"
                                    value={address.city}
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                    placeholder="Enter City"
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div>
                                <label className='text-sm mb-1'>State</label>
                                <input
                                    type="text"
                                    value={address.state}
                                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                    placeholder="Enter State"
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                        </div>
                        <div>
                            <label className='text-sm mb-1'>Pincode</label>
                            <input
                                type="text"
                                value={address.pincode}
                                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                placeholder="Enter Pincode"
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <Button onClick={handleCurrentLocation} variant='outline' className="mt-3">Use Current Location</Button>
                    </div>
                    <Separator className="my-6" />
                    <div>
                        <h2 className='font-medium text-xl my-6'>Upload Images</h2>
                        <UploadImages triggerUploadImages={triggerUploadImages} setLoader={setLoader} listingInfo={listingInfo} mode={mode} />
                    </div>
                    <Button type="submit" variant='primary' className='mt-6 flex gap-2'>
                        {loader ? <BiLoaderAlt className='animate-spin' /> : null}
                        <span>{mode === 'edit' ? 'Update Listing' : 'Add Listing'}</span>
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AddListing;
