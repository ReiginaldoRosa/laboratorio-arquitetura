export class Logica {
    constructor() {
        console.log("Módulo Lógica: Ativo");
    }

    // Gera as combinações de bits para 2 variáveis (A e B)
    gerarCombinacoes() {
        return [
            { A: 0, B: 0 },
            { A: 0, B: 1 },
            { A: 1, B: 0 },
            { A: 1, B: 1 }
        ];
    }

    // Avalia uma expressão simples de AND (.) ou OR (+)
    resolverExpressao(a, b, operador) {
        if (operador === '.') return a && b ? 1 : 0;
        if (operador === '+') return a || b ? 1 : 0;
        return 0;
    }
}