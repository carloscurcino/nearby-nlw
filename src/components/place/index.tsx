import React from 'react';
import { Text, TouchableOpacity, View, TouchableOpacityProps, Image } from 'react-native';
import { styles } from './style';
import { IconTicket } from '@tabler/icons-react-native';
import { colors } from '@/styles/colors';

export type PlaceProps = {
    id: string;
    name: string;
    description: string;
    coupons: number;
    cover: string;
    address: string;
}

type Props = TouchableOpacityProps & {
    data: PlaceProps;
}

export const Place = ({ data, ...rest }: Props) => {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Image source={{ uri: data.cover }} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.description} numberOfLines={2}>{data.description}</Text>

                <View style={styles.footer}>
                    <IconTicket size={16} color={colors.red.base} />
                    <Text style={styles.tickets}>{data.coupons} Cupons disponíveis</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}