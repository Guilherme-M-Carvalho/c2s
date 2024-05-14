import * as React from 'react';
import { Searchbar, SearchbarProps } from 'react-native-paper';

const SearchbarComponent = ({ ...props }: SearchbarProps) => {

    return (
        <Searchbar
            {...props}
            placeholder="Search"
        />
    );
};

export { SearchbarComponent };