import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { colors } from '@/styles/colors';

export const Loading = () => {
    return <ActivityIndicator style={styles.container} size="large" color={colors.green.base} />;
}
