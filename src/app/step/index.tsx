import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../../constants/color';
import { Header } from '../../../components/header'

export default function Step() {
    return (
        <View>
            <Header
                step='Passo 1'
                title='Vamos começar'
            />
        </View>
    )
}