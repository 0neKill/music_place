import React from "react";

export function useInput(init){
    const [value, setValue] = React.useState(init);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    return {
        value, onChange
    }
}