import { View, Text, Alert, ScrollView, Modal, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import { useCameraPermissions, CameraView } from 'expo-camera'
import { api } from '@/services/api'
import { Loading } from '@/components/loading'
import { Cover } from '@/components/market/cover'
import { Details, DetailsProps } from '@/components/market/details'
import { Coupon } from '@/components/market/coupon'
import { Button } from '@/components/button'

type DataProps = DetailsProps & {
    cover: string;
}

export default function Market() {
    const params = useLocalSearchParams<{ id: string }>()
    const [permission, requestPermission] = useCameraPermissions()
    const [data, setData] = useState<DataProps>()
    const [isLoading, setIsLoading] = useState(true)
    const [coupon, setCoupon] = useState<string | null>(null)
    const [isCouponFetching, setIsCouponFetching] = useState(false)
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const qrLock = useRef(false)

    useEffect(() => {
        fetchMarket()
    }, [params.id, coupon])
    console.log(params.id)
    const fetchMarket = async () => {
        try {
            const { data } = await api.get(`/markets/${params.id}`)
            setData(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            Alert.alert('Erro', 'Não foi possível carregar os locais', [{ text: 'OK', onPress: () => router.back() }])
        }
    }

    const handleOpenCamera = async () => {
        try {
            const { granted } = await requestPermission()

            if (!granted) return Alert.alert('Camera', 'Você precisa permitir o acesso a câmera')

            qrLock.current = false
            setIsVisibleModal(true)
        } catch (error) {
            console.log(error)
            Alert.alert('Erro', 'Não foi possível abrir a câmera')
        }
    }

    const getCoupon = async (id: string) => {
        try {
            setIsCouponFetching(true)
            const { data } = await api.patch(`/coupons/${id}`)

            Alert.alert('Cupom', `Cupom gerado com sucesso: ${data.coupon}`)
            setCoupon(data.coupon)
        } catch (error) {
            console.log(error)
            Alert.alert('Erro', 'Não foi possível obter o cupom')
        } finally {
            setIsCouponFetching(false)
        }
    }

    const handleUseCoupon = async (id: string) => {
        setIsVisibleModal(false)

        Alert.alert('Cupom', 'Não é possível reutilizar um cupom resgatado. Deseja utilizar o cupom?', [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => getCoupon(id) }])
    }

    if (isLoading) return <Loading />

    if (!data) return <Redirect href="/home" />

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" hidden={isVisibleModal} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Cover uri={data.cover} />
                <Details data={data} />
                {coupon && <Coupon code={coupon} />}
            </ScrollView>

            <View style={{ padding: 32 }}>
                <Button onPress={handleOpenCamera}>
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{ flex: 1, justifyContent: "center" }} visible={isVisibleModal}>
                <CameraView style={{ flex: 1 }} facing='back' onBarcodeScanned={({ data }) => {
                    if (data && !qrLock.current) {
                        qrLock.current = true
                        setTimeout(() => handleUseCoupon(data), 500)
                    }
                }} />
                <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                    <Button onPress={() => setIsVisibleModal(false)} isLoading={isCouponFetching}>
                        <Button.Title>Voltar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}