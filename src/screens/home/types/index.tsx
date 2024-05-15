export type FilterProps = { name: boolean; nasc: boolean; gender: boolean; contains: boolean; modal: boolean }

export type HandleChangeFilterProps = (fields: keyof(FilterProps)) => void