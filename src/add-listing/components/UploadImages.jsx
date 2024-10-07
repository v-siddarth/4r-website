import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { storage, db } from './../../../configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { IoMdCloseCircle } from "react-icons/io";

function UploadImages({ triggerUploadImages, setLoader, listingInfo, mode }) {
    const [selectedFileList, setSelectedFileList] = useState([]);
    const [editImageList, setEditImageList] = useState([]);

    useEffect(() => {
        if (mode === 'edit' && listingInfo) {
            setEditImageList(listingInfo.images || []);
        }
    }, [listingInfo, mode]);

    useEffect(() => {
        if (triggerUploadImages) {
            uploadImagesToServer(triggerUploadImages);
        }
    }, [triggerUploadImages]);

    const onFileSelected = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
        setSelectedFileList((prev) => [...prev, ...fileArray]);
    };

    const onImageRemove = (image, index) => {
        const updatedList = selectedFileList.filter((item) => item !== image);
        setSelectedFileList(updatedList);
    };

    const onImageRemoveFromDB = async (imageUrl) => {
        setLoader(true);
        try {
            // Delete from Firebase Storage
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);

            // Remove from Firestore
            if (listingInfo && listingInfo.id) {
                const listingRef = doc(db, 'listings', listingInfo.id);
                await updateDoc(listingRef, {
                    images: arrayRemove(imageUrl)
                });

                // Update local state
                setEditImageList((prev) => prev.filter((url) => url !== imageUrl));
            }
        } catch (error) {
            console.error('Error removing image:', error);
        }
        setLoader(false);
    };

    const uploadImagesToServer = async (listingId) => {
        setLoader(true);
        try {
            const uploadedImageUrls = [];
            for (const file of selectedFileList) {
                const fileName = `${Date.now()}_${file.name}`;
                const storageRef = ref(storage, `listings/${listingId}/${fileName}`);
                const metaData = {
                    contentType: file.type
                };
                await uploadBytes(storageRef, file, metaData);
                const downloadUrl = await getDownloadURL(storageRef);
                uploadedImageUrls.push(downloadUrl);
            }

            // Update Firestore with image URLs
            if (uploadedImageUrls.length > 0) {
                const listingRef = doc(db, 'listings', listingId);
                await updateDoc(listingRef, {
                    images: arrayUnion(...uploadedImageUrls)
                });
            }

            // Clear selected files after upload
            setSelectedFileList([]);
            setLoader(false);
        } catch (error) {
            console.error('Error uploading images:', error);
            setLoader(false);
        }
    };

    return (
        <div>
            <h2 className='font-medium text-xl my-3'>Upload Product Images</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
                {mode === 'edit' &&
                    editImageList?.map((imageUrl, index) => (
                        <div key={index} className='relative'>
                            <IoMdCloseCircle className='absolute top-1 right-1 text-xl text-white cursor-pointer'
                                onClick={() => onImageRemoveFromDB(imageUrl)}
                            />
                            <img src={imageUrl} className='w-full h-[130px] object-cover rounded-xl' alt='Product' />
                        </div>
                    ))
                }

                {selectedFileList.map((file, index) => (
                    <div key={index} className='relative'>
                        <IoMdCloseCircle className='absolute top-1 right-1 text-xl text-white cursor-pointer'
                            onClick={() => onImageRemove(file, index)}
                        />
                        <img src={URL.createObjectURL(file)} className='w-full h-[130px] object-cover rounded-xl' alt='Selected' />
                    </div>
                ))}

                <label htmlFor='upload-images'>
                    <div className='border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md'>
                        <h2 className='text-lg text-center text-primary'>+</h2>
                    </div>
                </label>
                <input type="file" multiple id='upload-images'
                    onChange={onFileSelected}
                    className='hidden' />
            </div>
        </div>
    );
}

export default UploadImages;
