/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function DropdownField({item,handleInputChange,wasteInfo}) {
  return (
    <div>
        <Select onValueChange={(value)=>handleInputChange(item.name,value)}
        required={item.required}
        defaultValue={wasteInfo?.[item?.name]}
        >
        <SelectTrigger className="w-full">
            <SelectValue placeholder={wasteInfo?.[item?.name]?wasteInfo?.[item?.name]:item.label} />
        </SelectTrigger>
        <SelectContent>
            {item?.options?.map((option,index)=>(
            <SelectItem value={option}>{option}</SelectItem>
            ))}
        </SelectContent>
        </Select>

    </div>
  )
}

export default DropdownField