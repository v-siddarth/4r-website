import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from './ui/separator';
import { CiSearch } from "react-icons/ci";
import Data from '@/Shared/Data';
import { Link } from 'react-router-dom';

function Search() {
    const [category, setCategory] = useState();

    return (
        <div className='p-2 md:p-5 bg-white rounded-md 
        md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center
        w-[60%]'>
            <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    {/* Use optional chaining to safely handle undefined */}
                    {Data.WasteTypes?.map((category, index) => (
                        <SelectItem key={index} value={category.name}>
                            {category.name}
                        </SelectItem>
                    )) || <SelectItem>No Category Available</SelectItem>}
                </SelectContent>
            </Select>

            <Separator orientation="vertical" className="hidden md:block" />

            {/* Search Button */}
            <Link to={`/search?category=${category}`}>
                <CiSearch className='text-[50px] bg-primary 
                rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer' />
            </Link>
        </div>
    );
}

export default Search;
