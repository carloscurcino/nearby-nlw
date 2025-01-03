import React, { useRef } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { Place, PlaceProps } from '../place';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { styles } from './style';
import { router } from 'expo-router';

type Props = {
    data: PlaceProps[]
}

export const Places = ({ data }: Props) => {
    const dimensions = useWindowDimensions();
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = {
        min: 278,
        max: dimensions.height - 128
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[snapPoints.min, snapPoints.max]}
            handleIndicatorStyle={styles.indicator}
            backgroundStyle={styles.container}
            enableOverDrag={false}
        >
            <BottomSheetFlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Place data={item} onPress={() => router.navigate(`/market/${item.id}`)} />}
                contentContainerStyle={styles.content}
                ListHeaderComponent={() => (
                    <Text style={styles.title}>Explore locais perto de você</Text>
                )}
            />
        </BottomSheet>
    );
}
