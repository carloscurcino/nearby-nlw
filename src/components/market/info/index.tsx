import { colors } from '@/styles/colors';
import { Icon, IconProps } from '@tabler/icons-react-native';
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

type InfoProps = {
    description: string;
    icon: React.ComponentType<IconProps>
}

export const Info = ({ icon: Icon, description }: InfoProps) => {
    return (
        <View style={styles.container}>
            <Icon size={16} color={colors.gray[400]} />
            <Text style={styles.text}>{description}</Text>
        </View>
    );
}
