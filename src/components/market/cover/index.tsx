import React from 'react';
import { View, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';
import { Button } from '@/components/button';
import { IconArrowLeft } from '@tabler/icons-react-native';

type CoverProps = {
    uri: string;
}

export const Cover = ({ uri }: CoverProps) => {
    return (
        <ImageBackground source={{ uri }} style={styles.container}>
            <View style={styles.header}>
                <Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
                    <Button.Icon icon={IconArrowLeft} />
                </Button>
            </View>
        </ImageBackground>
    );
}
