import { IconButton, IconButtonProps } from "react-native-paper";

export function IconButtonFilter({ ...props }: IconButtonProps) {
    return <IconButton
        iconColor="#1c1b1f"
        size={20}
        {...props}
    />
}