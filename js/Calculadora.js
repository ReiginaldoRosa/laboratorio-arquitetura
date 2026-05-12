export class Calculadora {
    constructor() {
        console.log("Módulo Calculadora: Ativo");
    }

    converterDecimalParaBinario(decimal) {
        let num = parseInt(decimal);
        if (isNaN(num)) return { erro: "Número inválido" };

        let passos = [];
        let tempNum = num;
        
        if (tempNum === 0) passos.push({ dividendo: 0, resto: 0 });

        while (tempNum > 0) {
            let resto = tempNum % 2;
            let quociente = Math.floor(tempNum / 2);
            passos.push({ dividendo: tempNum, resto: resto, quociente: quociente });
            tempNum = quociente;
        }

        return {
            resultado: num.toString(2),
            passos: passos.reverse() // Inverte para mostrar do início ao fim
        };
    }
}