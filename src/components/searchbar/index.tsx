import * as React from 'react';
import { Searchbar, SearchbarProps } from 'react-native-paper';

const SearchbarComponent = ({ ...props }: SearchbarProps) => {

    return (
        <Searchbar
            style={{
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#1c1b1f",
                flex: 1
            }}
            placeholder="Busca..."
            {...props}

        />
    );
};

export { SearchbarComponent };