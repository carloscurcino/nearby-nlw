import * as Location from 'expo-location'
import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { api } from '@/services/api'
import { Categories, CategoriesProps } from '@/components/categories'
import { Places } from '@/components/places'
import { PlaceProps } from '@/components/place'
import MapView, { Callout, Marker } from 'react-native-maps'
import { colors, fontFamily } from "@/styles/theme"
import { router } from 'expo-router'

type MerketProps = PlaceProps & {
    latitude: number;
    longitude: number;
}

export default function Home() {
    const [categories, setCategories] = useState<CategoriesProps>([])
    const [category, setCategory] = useState<string>("")
    const [markets, setMarkets] = useState([])

    useEffect(() => {
        getCurrentLocation()
        fetchCategories()
    }, [])

    useEffect(() => { fetchPlaces() }, [category])

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories')
            setCategories(data)
            setCategory(data[0].id)
        } catch (error) {
            console.log(error)
            Alert.alert('Categorias', 'Não foi possível carregar as categorias')
        }
    }

    const fetchPlaces = async () => {
        try {
            if (!category) return

            const { data } = await api.get(`/markets/category/${category}`)
            setMarkets(data)
        } catch (error) {
            console.log(error)
            Alert.alert('Locais', 'Não foi possível carregar os locais')
        }
    }

    async function getCurrentLocation() {
        let { granted } = await Location.requestForegroundPermissionsAsync();
        if (granted) {
            let location = await Location.getCurrentPositionAsync();
            // console.log("Location", location);
        } else {
            console.log("Permissão negada")
        }
    }

    const currentLocation = {
        latitude: -23.561187293883442,
        longitude: -46.656451388116494
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
            <Categories data={categories} onSelect={setCategory} selected={category} />
            <MapView
                style={{ flex: 1 }}
                region={{
                    longitude: currentLocation.longitude,
                    latitude: currentLocation.latitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {
                    markets.map((market: MerketProps) => (
                        <Marker
                            key={market.id}
                            identifier={market.id}
                            coordinate={{
                                latitude: market.latitude,
                                longitude: market.longitude
                            }}
                            image={require('@/assets/pin.png')}
                        >
                            <Callout
                                onPress={() => router.navigate(`/market/${market.id}`)}
                            >
                                <View>
                                    <Text style={{ fontSize: 14, color: colors.gray[600], fontFamily: fontFamily.medium }}>{market.name}</Text>
                                    <Text style={{ fontSize: 12, color: colors.gray[600], fontFamily: fontFamily.regular }}>{market.address}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                    )}
                <Marker
                    identifier='current'
                    coordinate={
                        {
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude
                        }
                    }
                    image={require('@/assets/location.png')}
                />
            </MapView>
            <Places data={markets} />
        </View>
    )
}