// Inteface to set fixed data types
import { ChangeEvent, useState } from 'react';

interface SchemeProps {
    schemeData: {
        id: string;
        amount: string;
        type: string;
    };

    // function to handle scheme data changes from parent (App.tsx)
    onSchemeDataChange: (updatedData: { id: string; amount: string; type: string }) => void;
}

const Scheme = ({ schemeData, onSchemeDataChange }: SchemeProps) => {
    // state to hide/unhide the input button
    const [inputVisible, setInputVisible] = useState(false);
    // function to handle changes and store the users input and selection 
    const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        // destructuring the event.target object and 
        // extracting the name attribute to know which data type has been input and 
        // value attribute to get the user input
        const { name, value } = event.target;

        // Find the correct column to insert value into
        if (name === "type") {
            if (value === "") {
                setInputVisible(false);
            } else if (value === "Fixed Pricing" || "Variable-based") {
                setInputVisible(true);
            }
        }

        // user input extracted then place/replace the value input-ed to the correct schemeData
        onSchemeDataChange({ ...schemeData, [name]: value });
    };
    return (
        <div>
            <select >
                <option value="" disabled>Select option</option>
                <option value="Fixed pricing" >Fixed pricing</option>
                <option value="Variable-based" >Variable-based</option>
            </select>

            {inputVisible && (
                <input
                    type="number"
                    name="amount"
                    placeholder="0"
                    value={schemeData.amount}
                    onChange={handleChange}
                    className='input'
                />
            )}
        </div>
    )
}

export default Scheme
