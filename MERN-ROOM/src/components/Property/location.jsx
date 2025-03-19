import React from 'react'
import {MapPin} from 'lucide-react';


function location() {
    return (
        <>
            <div className="m-10 p-5 flex-col bg-gray-100 w-[70%] rounded-lg shadow-sm">
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Location
                    </h3>
                    <div className="flex items-start space-x-3 text-[16px]">
                        <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                        <div className="space-y-2">
                            <div className="text-lg text-gray-700">
                                Ahmedabad, Gujarat, India
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default location