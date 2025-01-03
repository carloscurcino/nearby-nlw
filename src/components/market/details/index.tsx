import React from 'react';
import { Text, View } from 'react-native';
import { IconPhone, IconMapPin, IconTicket } from '@tabler/icons-react-native';
import { styles } from './styles';
import { Info } from '../info';

export type DetailsProps = {
    name: string;
    description: string;
    address: string;
    phone: string;
    coupons: number;
    rules: {
        id: string;
        description: string;
    }[]
}

type Props = {
    data: DetailsProps
}

export const Details = ({ data }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.description}>{data.description}</Text>

            <View style={styles.group}>
                <Text style={styles.title}>Informações</Text>

                <Info icon={IconTicket} description={`${data.coupons} cupo${data.coupons > 1 ? "ns" : "m"} disponíve${data.coupons > 1 ? "is" : "l"}`} />
                <Info icon={IconMapPin} description={data.address} />
                <Info icon={IconPhone} description={data.phone} />
            </View>

            <View style={styles.group}>
                <Text style={styles.title}>Regulamento</Text>
                {data.rules.map(rule => (
                    <Text key={rule.id} style={styles.rule}>
                        {`\u2022 ${rule.description}`}
                    </Text>
                ))}
            </View>
        </View>
    );
}
