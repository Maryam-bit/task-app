const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent);

const farenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8;
}

const celciusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32;
}
module.exports = {
    calculateTip,
    farenheitToCelsius,
    celciusToFahrenheit
}