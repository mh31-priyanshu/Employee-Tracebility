/* eslint-disable no-unused-vars */
import { useState } from "react";

export default function AutocompleteInput({ suggestions, label, onChange }) {

    // Handle the change when a selection is made
    const handleSelectChange = (e) => {
        const selectedValue = suggestions.find(suggestion => suggestion.id === e.target.value);
        onChange(selectedValue);  // Update state with the selected object
    };

    return (
        <>
            <label htmlFor="shift-name" className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

            {/* Dropdown with suggestions */}
            <select onChange={handleSelectChange} className="w-full p-2 border rounded">
                <option value="">Select {label}</option>
                {/* Map through the suggestions and create options */}
                {suggestions.map((suggestion) => (
                    <option key={suggestion.id} value={suggestion.id}>
                        {label === "Employee ID" ?`${suggestion.id} - ${suggestion.name}` : `${suggestion.name} - ${suggestion.id}`}
                    </option>
                ))}
            </select>
        </>
    );
}
