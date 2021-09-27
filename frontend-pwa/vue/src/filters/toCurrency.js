export default (value) =>{
  if (typeof value !== "number") {
    return value;
}
var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0
});
return formatter.format(value);
}