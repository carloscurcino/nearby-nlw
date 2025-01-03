import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { colors } from '@/styles/theme';
import { IconTicket } from '@tabler/icons-react-native';

type CouponProps = {
    code: string;
}

export const Coupon = ({ code }: CouponProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Utilize esse cupom</Text>

            <View style={styles.content}>
                <IconTicket size={24} color={colors.green.light} />
                <Text style={styles.code}>{code}</Text>
            </View>
        </View>
    );
}
