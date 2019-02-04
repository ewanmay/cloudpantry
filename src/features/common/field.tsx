import * as React from 'react';
import { TextInput, View, Text } from 'react-native';
import { fieldStyles } from './styles';

interface InputProps {
    label: string,
    value: string,
    placeholder: string,
    secure: boolean,
    onChangeText: (message: string) => void
}

const Field = ({ label, value, onChangeText, placeholder, secure }: InputProps) => {
    const { fieldLabelStyle, fieldContainerStyle, fieldInputStyle } = fieldStyles;
    return (
        <View style={fieldContainerStyle}>
            <Text style={fieldLabelStyle}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={fieldInputStyle}
                autoCorrect={false}
                placeholderTextColor={'#6c8eec'}
                placeholder={placeholder}
                secureTextEntry={secure}
            />
        </View>
    )
}

export default Field;