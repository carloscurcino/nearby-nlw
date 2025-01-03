import { colors } from '@/styles/theme';
import { categoriesIcons } from '@/utils/categories-icons';
import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { styles } from './style';

type CategoryProps = PressableProps & {
    name: string;
    iconId: string;
    isSelected?: boolean;
}

export const Category = ({ iconId, isSelected, name, ...rest }: CategoryProps) => {
    const Icon = categoriesIcons[iconId];
    return (
        <Pressable style={[styles.container, isSelected && styles.containerSelected]} {...rest}>
            <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
            <Text style={[styles.name, isSelected && styles.nameSelected]}>{name}</Text>
        </Pressable>
    );
}
