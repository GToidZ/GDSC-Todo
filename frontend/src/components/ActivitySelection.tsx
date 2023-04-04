import React from "react";

interface props {
    icon: React.ReactElement,
    name: string,
    minimized: boolean
}

const ActivitySelection = ({ icon, name, minimized }: props) => {
    const currentUrl = window.location.pathname

    return (
        <a href={`${name.toLowerCase().split(' ')[0]}`} className={`gap-3 rounded-lg ${currentUrl.includes(name.toLowerCase().split(' ')[0]) && 'bg-[#EBEBEB]'}`} >
            <button className="flex p-2">
                {icon}
                <p className={`ml-2 ${minimized ? "hidden" : ""}`}>{name}</p>
            </button>
        </a>
    )
}

export default ActivitySelection