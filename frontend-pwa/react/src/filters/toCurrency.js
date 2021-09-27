const toCurrency = (value) =>{
  if (typeof value !== "number") {
    return value;
}
var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
});
return formatter.format(value);
}

export default toCurrency;