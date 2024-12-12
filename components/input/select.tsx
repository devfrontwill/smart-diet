import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Controller } from 'react-hook-form';
import { colors } from '@/constants/color';
import { Feather } from '@expo/vector-icons';

interface OptionsProps {
    label: string;
    value: string | number;
}

interface SelectProps {
    name: string;
    control: any;
    placeholder?: string;
    error?: string;
    options: OptionsProps[];
}

export function Select({ name, control, placeholder, error, options }: SelectProps) {
    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}

                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TouchableOpacity style={styles.select}>
                            <Text>Selecione algo...</Text>
                            <Feather name='arrow-down' size={16} color="#000" />
                        </TouchableOpacity>
                    </>
                )}
            />

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    input: {
        height: 44,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    errorText: {
        color: '#ff0000',
        marginTop: 4,
    },
    select: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 4,
    }
})