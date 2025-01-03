import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator, Text, TextProps } from 'react-native';
import { colors } from '@/styles/theme';
import { styles } from './style';
import { IconProps as TablerIconProps } from '@tabler/icons-react-native';

type ButtonProps = TouchableOpacityProps & {
    isLoading?: boolean;
}

const Button = ({ children, style, isLoading = false, ...rest }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            activeOpacity={0.8}
            disabled={isLoading}
            {...rest}
        >
            {isLoading ? <ActivityIndicator size="small" color={colors.gray[100]} /> : children}
        </TouchableOpacity>
    );
};

const Title = ({ children }: TextProps) => {
    return <Text style={styles.title}>{children}</Text>
};

type IconProps = TablerIconProps & {
    icon: React.ComponentType<TablerIconProps>;
}

const Icon = ({ icon: Icon }: IconProps) => {
    return <Icon size={24} color={colors.gray[100]} />;
}
Button.Title = Title;
Button.Icon = Icon;

export { Button };