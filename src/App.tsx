
import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TextInput,
  Pressable
} from 'react-native';

//Bringing in the Constants:
import { currencyByRupee } from './constants';
//Bringing in Components
import CurrencyButton from './components/CurrencyButton';

import Snackbar from 'react-native-snackbar'; //This library was installed using the following terminal commmand: " npm i react-native-snackbar ", from the following link: https://www.npmjs.com/package/react-native-snackbar 
// Snackbar is used for dislayed a brief message to the user, along with an optinal action. They animate up from the bottom of the screen and then dissapear shortley afterwards.

const App = (): JSX.Element => {

  const [inputValue, setInputValue] = useState('')
  const [resultValue, setResultValue] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')

  const buttonPressed = (targetValue: Currency) => { //Takes a parameter "targetValue" of type Currency
    
    if (!inputValue) { //if the inputValue is empty...
      return Snackbar.show({ //return Snackbar.show({})  (within the .show function, you have to define a few objects, wich are the following things...)
        text: "Enter a value to convert", //text that says this,
        backgroundColor: "#EA7773", //has a background colour of this
        textColor: "#000000", // and a text colour of this
        duration: Snackbar.LENGTH_LONG
      })
    }

    const inputAmount = parseFloat(inputValue) //You have created a variable called "inputAmount", that grabs the inputValue (if there is something there),
    // and parses it into a float data type. This ensures that the value is indeed a decimal value

    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`
      setResultValue(result)
      setTargetCurrency(targetValue.name)
    }
    else {
      return Snackbar.show({
        text: "Enter a valid number to convert",
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
        duration: Snackbar.LENGTH_LONG
      })
    }
    /*
    Lets explain lines 43-45. isNaN() is a function that returns a boolean, and it stands for "is Not a Number".
    Basically it checks to see if the value you pass it as a parameter (in this case, inputAmount), is a number
    or not. If it IS A NUMBER, it will return false. If it IS NOT A NUMBER, it will return true (kind of backwards
    to how you'd expect, but it makes sense considering the name of the function).

    If the value is indeed a number (ie. isNaN returns false), you create a variable called "convertedValue",
    and set its value to the "inputAmount", multiplied by the "targetValue.value". 

    This is the interesting part. targetValue is of type Currency (as specified within the parrameters of the
    "buttonPressed" function on line 30). This "data type" was created in the "index.d.ts" file, using an
    interface. Within a Currency, it has four characteristics, or member variables if you will: name, value,
    flag, and symbol. You are simply grabbing the "value" of the specific currency passed as a parameter into
    the function call, and multiplying inputAmount by its value to convert the inputAmount to the desired currency.

    In line 45, you create a variable called "result", in which you use Template Literal Syntax to construct a string.
    ${targetValue.symbol} uses the value of targetValue.symbol (Remember coz its of type Currency, it has this
    member variable, lok at index.d.ts file for a better understanding), and adds a currency symbol in front of it,
    in this case $. Then ${convertedValue.toFixed(2)} takes the "convertedValue" variable you made in line 44,
    and uses the .toFixed() method to format the number to 2 decimal places, and similarly adds a currency value
    to the front, in this case, also $.
    */
  }

  return (
    <SafeAreaView >
      <StatusBar/>
      <View style={styles.container} >

        {/* Top Container */}
        <View style={styles.topContainer} >
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput 
            maxLength={14}
            value={inputValue}
            clearButtonMode='always' //This will automatically clear the text input space when the button is pressed. THIS IS ONLY AN IOS FEATURE
            onChangeText={setInputValue} //When text is changed, we want to add the value to our state. This does that
            keyboardType='number-pad'
            placeholder='Enter Amount in Rupees'
            />
          </View>
          {resultValue && (
            <Text style={styles.resultTxt}>
              {resultValue}
            </Text>
          )} { /* Writing this between the curly brackets allows you do write in javascript. In Javascript, expressions inside {} brackets in JSX are evaluated and rendered into the UI if they return a truthy value.
          resultValue && (....) is a common Javascript pattern where the left side (resultValue) is checked. If resultValue is a truthy value (ie. is not a null, undefined, 0, false, or empty string value), then the code
          inside the parenthesis will be executed, rendering the Text component */ }
        </View>
        
        {/* Bottom Container */}
        <View style={styles.bottomContainer}>
            <FlatList 
            numColumns={3}
            data={currencyByRupee} //All data is being fetched from the src/components/constants.ts file, where you have created all the currency constants and their data. You imported these in line 17.
            keyExtractor={item => item.name} //key extractor is essentially looking through our constants.ts array, and taking the name key from it for each item of the flatlist. Super simple. You could similarly say item.symbol if thats what you wanted instead.
            renderItem={ ({item}) => (
              <Pressable
              style={[styles.button, targetCurrency === item.name && styles.selected]} //This just changes the styles depending on if its selected or not
              onPress={() => buttonPressed(item)} // onPress event is calling the buttonPressed function you wrote on lines 31-56, and giving it "item" (the selected item) as the parameter. 
              >
                <CurrencyButton {...item} />
              </Pressable>
            )} //Is the element that you want to print on the screen
            />
        </View>

      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f7fc'
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800'
  },
  rupee: {
    marginRight: 8,

    fontSize: 22,
    color: '#000000',
    fontWeight: '800'
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF'
  },
  bottomContainer: {
    flex: 3
  },
  button: {
    flex: 1,

    margin: 22,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7'
  }
});

export default App;
