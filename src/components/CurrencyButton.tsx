import React from 'react'
import type { PropsWithChildren } from 'react'
// PropsWithChildren is imported in the line above, making sure that any data being
// parsed into this component must be of a particular type
import { View, Text, StyleSheet } from 'react-native'

type CurrencyButtonProps = PropsWithChildren<{
    name: string;
    value: number;
    flag: string;
    symbol: string;
}>
// Lines 7-10 basically say that this components expects props of name, flag etc. of types string.
// This is set as a parameter in line 14, where "props: CurrencyButtonProps"

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
    return(
        <View style={styles.buttonContainer}>
            <Text style={styles.flag}>{String(props.flag)}</Text>
            <Text style={styles.country}>{String(props.name)}</Text>
        </View>
    )
}

/*
Lets explain:

the following bit of code in line 19 for example: {props.flag}.

The purpose of this code is basically to extract the value held by the 'flag' prop, that has been 
passed as a parameter/prop when you have created a little instance of this button within App.tsx.
So in one example, the button for the Australian AUD currency will therefore show the Australian
flag. The data values for these props have been set within index.d.ts file as an interface,
and that interface has been used to create the hardcoded values and country intances within the
constants.ts file (all within the 'src' folder).
*/

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center'
    },
    flag: {
        fontSize: 28,
        color: "#FFFFFF",
        marginBottom: 4
    },
    country: {
        fontSize: 14,
        color: "#2d3436",
    }
})

export default CurrencyButton