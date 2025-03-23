import React from 'react'
import { User2, Users, Wallet, Search } from 'lucide-react';


export default function basicInfo({info}) {
    
    console.log(info);

const { rent, buildingType, roomType, genderLookingFor } = info;
return (
    <>
        <div className="bg-gray-100 m-10 p-5 w-[70%] rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                Basic Info
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="flex items-start gap-3">
                    <User2 className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500">Building Type:</span>
                        <span className="font-medium text-gray-800">{buildingType || "NA"}</span>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500">Furnished:</span>
                        <span className="font-medium text-gray-800">{roomType}</span>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Wallet className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500">Approx Rent</span>
                        <span className="font-medium text-gray-800">₹ {rent}</span>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Search className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500">Looking For</span>
                        <span className="font-medium text-gray-800">{genderLookingFor}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}

