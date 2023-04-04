import axios from "axios";
import { useEffect, useState } from "react";
import ActivityList from "../components/ActivityList";
import { todoModel, API_LINK } from "../models/todo"


const Important = () => {
    const [data, setData] = useState<todoModel[]>([]);
    const getData = async () => {
        try {
            const res = await axios.get(API_LINK + "/todo");
            setData(res.data);
        }
        catch (e) {
            alert("Error When fetch data")
        }
    }
    useEffect(() => {
        getData();
    })
    return (
        <div className="p-3 w-full h-full">
            <ActivityList data={data} />
        </div>
    )
}

export default Important