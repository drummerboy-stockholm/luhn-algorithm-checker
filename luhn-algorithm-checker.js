// Ett gäng giltiga kortnummer
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6] //Yes, även 15-siffriga nummer kan vara giltiga, enligt algoritmen
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// Ett gäng ogiltiga kortnummer
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Och här har vi några kortnummer som antingen är giltiga eller ogiltiga
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// En array innehållande alla arrayer ovan
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]




// FUNKTION 1: validateCred tar en nummerserie och returnerar True eller False beoende på om den validerar enligt Luhn-algoritmen.

function validateCred(credArray) {
    let reverseCredArray = [];
    let tempCardArray = [];

    // Eftersom kortets nummer ska stegas igenom bakifrån så vänder vi på arrayen. Har dock en känsla av att man kan slippa detta på något sätt ;)

    for (let i = (credArray.length -1); i > -1; i-=1) {
        reverseCredArray.push(credArray[i]);
    }

    // Och eftersom check-siffran (sista siffran, som nu alltså är den första siffran) i kortnumret ska exkluderas så tar vi bort den

    reverseCredArray.shift();

    // Dubblera varannan siffra i serien. OM siffran efter dubbleringen överstiger 9 så ska 9 dras bort från totalen. Den nya serien pushar vi in i en ny array, tempCardArray.

    for (let i2 = 0; i2 < reverseCredArray.length; i2++) {
        if (i2 % 2 == 0) {
            if (reverseCredArray[i2] > 4) {
            tempCardArray.push((reverseCredArray[i2] * 2) - 9);
            } else {
                tempCardArray.push(reverseCredArray[i2] * 2);
            }
        } else {
            tempCardArray.push(reverseCredArray[i2]);
        }

    }

    // Sista steget är att summera ihop resultatet av den nya nummerserien, dock med check-siffran inkluderad, så vi lägger tillbaka den först.    

    tempCardArray.push(credArray[credArray.length-1]);

    var sum = tempCardArray.reduce(function(a, b){
        return a + b;
    }, 0);
    
    // Om modulo 10 = 0 så är nummerserien korrekt enligt Luhn-algoritmen, och True returneras
    return sum % 10 === 0;
}


// FUNKTION 2: findInvalidCards tar emot en array med kortnummer, och returnerar en ny array innehållande ogiltiga kortnummer

function findInvalidCards(nestedCredArray) {

    let invalidCards = [];

    for (let i = 0; i < nestedCredArray.length; i++) {
        if (!validateCred(nestedCredArray[i])) {
            invalidCards.push(nestedCredArray[i]);
        }
    }

    return invalidCards;
}


// FUNKTION 3: idInvalidCardCompanies tar emot en array med (i detta fallet ogiltiga) kortnummer, och returnerar en ny array innehållande namnen på de utfärdare som tillhandahållit felaktiga kortnummer.

function idInvalidCardCompanies(invalidBatch) {
    
    let cardCompanies = [];
    
    for (let i = 0; i < invalidBatch.length; i++) {
        switch(invalidBatch[i][0]) {
            case 3:
                if (cardCompanies.indexOf('Amex') === -1) {
                cardCompanies.push('Amex');
                }
                break;
            case 4:
                if (cardCompanies.indexOf('Visa') === -1) {
                cardCompanies.push('Visa');
                }
                break;
            case 5:
                if (cardCompanies.indexOf('Mastercard') === -1) {
                cardCompanies.push('Mastercard');
                }
                break;
            case 6:
                if (cardCompanies.indexOf('Discover') === -1) {
                cardCompanies.push('Discover');
                }
                break;
        }
    }

    return cardCompanies;
}


// TEST AV FUNKTION 1:
console.log('TEST AV FUNKTION 1:')
console.log(`Matar in ett giltigt kortnummer och får värdet: ${validateCred(valid1)}`);
console.log(`Matar in ett ogiltigt kortnummer och får värdet: ${validateCred(invalid2)}`);

// TEST AV FUNKTION 2:
console.log('\nTEST AV FUNKTION 2: \nFöljande kortnummerserier i arrayen batch är ogiltiga:')
console.log(findInvalidCards(batch));

// TEST AV FUNKTION 3:
console.log('\nTEST AV FUNKTION 3: \nI listan över ogiltiga kortnummer finns följande utfärdare representerade:')
console.log(idInvalidCardCompanies(findInvalidCards(batch)));