export type FilterProps = {
    name: boolean;
    email: boolean;
    gender: boolean;
    nasc: boolean;
    phone: boolean;
    nationality: boolean;
    address: boolean;
    id: boolean;
    contains: boolean;
    modal: boolean;
}

export type HandleChangeFilterProps = (field: keyof FilterProps) => void