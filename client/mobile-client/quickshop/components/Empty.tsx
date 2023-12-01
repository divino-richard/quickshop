import { AntDesign, Feather } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from './Themed'
import Colors from '../constants/Colors'

interface Props {
    info: string
}

function Empty(props: Props) {
    const {info} = props

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Feather size={25} color={Colors.secondary_third} name='server'/>
            </View>
            <Text style={styles.infoText}>{info}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        alignItems: 'center',
        padding: 25,
        borderRadius: 25,
    },
    iconContainer: {
        height: 100,
        width: 100,
        backgroundColor: '#f8f8f8',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        marginTop: 15,
        fontSize: 15,
        fontWeight: '600',
        color: '#a8a8a8',
    },
})

export default Empty
