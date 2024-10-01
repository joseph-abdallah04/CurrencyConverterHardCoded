interface Currency {
    name: string;
    value: number;
    flag: string;
    symbol: string;
}

// Provides structure to app but allowing us to follow this interface when creating the buttons that will all
// have the same components. The buttons this applies to are the buttons with the countries and their flags
// on them that will convert the inputted currency to that countries currency. 

// Typescipt is used here to allow you to have type safety with your features.