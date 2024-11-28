import { useEffect, useState } from "react";
import "./Result.css"

interface ResultProps {
    schemeList: any[]; // Pass schemeList from App.tsx
    onSubmit: boolean;
}

const Result = ({ schemeList, onSubmit }: ResultProps) => {
    const [dataList, setDataList] = useState<any[]>([]); // array to store fetched data from database
    const [loading, setLoading] = useState(false); // placeholder for when rendering database results

    {/* GET METHOD FUNCTION */ }
    const getMethod = async () => {
        setLoading(true);
        try {
            // Simple get method and store the response
            const response = await fetch("http://localhost:5500/pricescheme", {
                method: "GET"
            })
            //Check response for error
            if (!response.ok) {
                console.error("Failed to get data from database");
                throw new Error("Error getting data");
            }
            // Deconstruct response data into json and store into list
            const data = await response.json();
            setDataList(data);
        }
        catch (error: any) {
            // log any errors
            console.error("Error getting data: ", error.message);
        }
        finally {
            setLoading(false);
        }
    }

    // Fetch the schemelist data and re-render database results when submit button is pressed
    useEffect(() => {
        // when submit is pressed, Get data from database
        if (schemeList.length > 0) {
            getMethod();
        }
    }, [onSubmit]);

    if (loading) return <p>Fetching Database...</p>; // simple placeholder for loading database

    return (
        <div>
            {/* TABLE HEADERS */}
            <div className="header">
                <h4 className="description">Order</h4> |
                <h4 className="description">Pricing Scheme</h4> |
                <h4 className="description">Description</h4> |
            </div>

            {/* DATA FROM DATABASE */}
            {dataList.map((data, index) => (
                <div key={data.id} className="data">
                    <div className="description">
                        <span className="text">{index + 1}</span> |
                    </div>

                    <div className="description">
                        <span className="text">{data.type}</span> |
                    </div>

                    <div className="description">
                        <span className="text">PhP  </span>
                        <span className="text">{data.amount}</span>
                        {data.type === "Fixed Pricing" && <span className="text">/kWh</span>}
                        {data.type === "Variable-based" && <span className="text">/kWh Admin Fee</span>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Result
