/* eslint-disable no-unused-vars */
import { useState } from "react";


export default function AutocompleteInput({ suggestions, label, value, onChange }) {

    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        onChange({ name: inputValue });
        if (inputValue) {
            const filtered = suggestions.filter((suggestion) =>
                suggestion.id.toLowerCase().includes(inputValue.toLowerCase()) ||
                suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };


    const handleSuggestionClick = (sugeestion) => {
        onChange(sugeestion);
        setFilteredSuggestions([]);
    }

    return (
        <>
            <label htmlFor="shift-name" className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input type="text" value={value.id && value.name ? `${value.id} - ${value.name}` : value.name || value.id || ''} onChange={handleChange} className="w-full p-2 border rounded" />

            {filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full border rounded mt-1 max-h-60 overflow-y-auto bg-white shadow-lg">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            { label === "Station Name" ? `${suggestion.name} - ${suggestion.id}` : `${suggestion.id} - ${suggestion.name}` }
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
