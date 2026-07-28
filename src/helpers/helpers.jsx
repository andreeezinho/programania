export const formatNumber = (number) => {
    if (!number) return "0,00";

    return number.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}