import { View } from 'react-native'
import { router } from 'expo-router';
import React from 'react'
import { Welcome } from '@/components/welcome';
import { Steps } from '@/components/steps';
import { Button } from '@/components/button';

function Index() {
    return (
        <View style={{ flex: 1, padding: 40, gap: 40 }}>
            <Welcome />
            <Steps />
            <Button onPress={() => router.navigate('/home')}>
                <Button.Title>Começar</Button.Title>
            </Button>
        </View>
    )
}

export default Index;