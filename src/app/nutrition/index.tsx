import { View, Text, StyleSheet } from 'react-native';
import { useDataStore } from '@/store/data';
import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { colors } from '@/constants/color';
import { Data } from '@/types/data';
import { Link } from 'expo-router';

interface ResponseData {
    data: Data
}

export default function Nutrition() {

    const user = useDataStore(state => state.user)

    const { data, isFetching, error } = useQuery({
        queryKey: ["nutrition"],
        queryFn: async () => {
            try {
                if (!user) {
                    throw new Error("Failed to load nutrition")
                }

                const response = await api.get<ResponseData>("/teste")

                /*
                 const response = await api.post("/create", {
                     name: user.name,
                     age: user.age,
                     gender: user.gender,
                     height: user.height,
                     weight: user.weight,
                     objective: user.objective,
                     level: user.level
                 })
                 */

                return response.data.data;


            } catch (error) {
                console.log(error)
            }
        }
    })

    if (isFetching) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Estamos gerando sua dieta! </Text>
                <Link href="/">
                    <Text style={styles.loadingText}> Tente Novamente</Text>
                </Link>
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}> Falha ao gerar sua dieta. </Text>
                <Text style={styles.loadingText}>Consultando IA. . .</Text>
            </View>
        )
    }

    return (
        <View>
            <Text> Última pagina ! </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: colors.background,
    },

    loadingText: {
        fontSize: 18,
        color: colors.white,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }
})