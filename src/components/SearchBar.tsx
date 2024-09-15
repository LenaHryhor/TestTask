import {TextField, TextFieldProps} from '@mui/material';
import {ChangeEventHandler, useEffect, useState} from 'react';

interface Props {
    value: string;
    onSearch: (searchTerm: string) => void;
}

export default function SearchBar({value, onSearch, ...props}: Props & Omit<TextFieldProps, "onChange" | "value">) {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(inputValue);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, onSearch]);

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
        setInputValue(e.target.value);
    };

    return <TextField value={inputValue} {...props} onChange={handleInputChange}/>
};
