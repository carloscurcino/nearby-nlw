import React from 'react';
import { FlatList, View } from 'react-native';
import { Category } from '../category';
import { styles } from './style';

export type CategoriesProps = {
    id: string;
    name: string;
}[]

type Props = {
    data: CategoriesProps;
    selected: string;
    onSelect: (id: string) => void;
}

export const Categories = ({ data, selected, onSelect }: Props) => {
    return (
        <View style={{ width: '100%' }}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Category
                        name={item.name}
                        iconId={item.id}
                        onPress={() => onSelect(item.id)}
                        isSelected={item.id === selected}
                    />
                )}
                contentContainerStyle={styles.content}
                style={styles.container}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}
