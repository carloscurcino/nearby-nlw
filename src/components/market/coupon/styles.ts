import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
    },
    title: {
        color: colors.gray[500],
        fontFamily: fontFamily.medium,
        marginBottom: 12,
        fontSize: 14,
    },
    content: {
        flexDirection: 'row',
        backgroundColor: colors.green.soft,
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    code: {
        color: colors.gray[600],
        fontSize: 16,
        fontFamily: fontFamily.semiBold,
        textTransform: 'uppercase',
    },
});