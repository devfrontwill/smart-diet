import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { colors } from '../../../constants/color';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Header } from '@/components/header';
import { Select } from '@/components/input/select';
import { useDataStore } from '@/store/data';

const schema = z.object({
    gender: z.string().min(1, { message: "O genero é obrigatório" }),
    objective: z.string().min(1, { message: "A objetivo é obrigatória" }),
    level: z.string().min(1, { message: "Selecione seu nivel" }),
})

type FormData = z.infer<typeof schema>

export default function Create() {

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const setPageTwo = useDataStore(state => state.setPageTwo)

    const genderOptions = [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" }
    ]

    const levelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade fisica)', value: 'Sedentario' },
        { label: 'Levemente Ativo (exercicios 1 a 3 vezes por semana)', value: 'Levemene Ativo (exercicios 1 a 3 vezes na semana)' },
        { label: 'Moderadamente Ativo (exercicios 3 a 5 vezes por semana)', value: 'Moderadamente Ativo (exercicios 3 a 5 vezes na semana)' },
        { label: 'Altamente Ativo (exercicios 5 a 7 vezes por semana)', value: 'Altamente Ativo (exercicios 5 a 7 vezes por semana)' },
    ]

    const objectiveOptions = [
        { label: 'Emagrecer', value: 'Emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia + Definição' },
        { label: 'Definição', value: 'Definição' },
    ]

    function handleCreate(data:FormData){
        setPageTwo({
            level: data.level,
            gender: data.gender,
            objective: data.objective
        })
        console.log("Navegando para a ultima pagina");
    }

    return (
        <View style={styles.container}>
            <Header
                step='Passo 2'
                title='Finalizando dieta'
            />

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Genero:</Text>
                <Select
                    control={control}
                    name='gender'
                    placeholder='Selecione seu genero'
                    error={errors.gender?.message}
                    options={genderOptions}
                />

                <Text style={styles.label}>Selecione o nivel de atividade fisica:</Text>
                <Select
                    control={control}
                    name='level'
                    placeholder='Selecione seu nivel de atividade fisica: '
                    error={errors.level?.message}
                    options={levelOptions}
                />

                <Text style={styles.label}>Selecione o seu objetivo:</Text>
                <Select
                    control={control}
                    name='objective'
                    placeholder='Selecione o seu objetivo: '
                    error={errors.objective?.message}
                    options={objectiveOptions}
                />

                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}> Avançar </Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    label: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    button: {
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})
