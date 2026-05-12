import { Calculadora } from './Calculadora.js';
import { ApiService } from './ApiService.js';
import { Logica } from './Logica.js';

// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    console.log("App Inicializado");

    const calc = new Calculadora();
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.tab-content');
    const api = new ApiService();
    const logica = new Logica();

    const btnGerarTabela = document.getElementById('btnGerarTabela');
    const displayLogica = document.getElementById('resultadoLogica');
    const seletorOperador = document.getElementById('operadorLogico');

    if (btnGerarTabela) {
        btnGerarTabela.addEventListener('click', () => {
            const operador = seletorOperador.value;
            const combinacoes = logica.gerarCombinacoes();

            // Uso de MAP para gerar as linhas da tabela
            const linhasHTML = combinacoes.map(c => {
                const resultado = logica.resolverExpressao(c.A, c.B, operador);
                return `
                <tr>
                    <td>${c.A}</td>
                    <td>${c.B}</td>
                    <td class="resultado-bit">${resultado}</td>
                </tr>
            `;
            }).join('');

            displayLogica.innerHTML = `
            <table class="tabela-verdade">
                <thead>
                    <tr>
                        <th>A</th>
                        <th>B</th>
                        <th>Saída (A ${operador} B)</th>
                    </tr>
                </thead>
                <tbody>
                    ${linhasHTML}
                </tbody>
            </table>
        `;
        });
    }

    // Localize o container da API no seu HTML
    const apiDataContainer = document.getElementById('api-data');

    // Criar uma função para carregar os dados quando a seção for aberta
    async function carregarLaboratorioDeDados() {
        apiDataContainer.innerHTML = "<p>Consultando banco de dados externo...</p>";

        const racas = await api.buscarRacas();

        // --- PROGRAMAÇÃO FUNCIONAL (Requisito NEAD) ---
        // 1. Filter: Vamos filtrar apenas raças que tenham nomes curtos (menos de 5 letras)
        // Isso demonstra que você sabe manipular arrays logicamente.
        const racasFiltradas = racas.filter(raca => raca.length <= 5);

        // 2. Map: Transformar o array de strings em um array de elementos HTML (li)
        const htmlItens = racasFiltradas.map(raca => `
        <li class="raca-item">
            <strong>Raça:</strong> ${raca.toUpperCase()}
        </li>
    `).join('');

        apiDataContainer.innerHTML = `
        <div class="api-card">
            <h4>Integração de Sistemas (Consumo de API)</h4>
            <p>Dados recuperados via HTTPS e processados com Programação Funcional (Filter/Map).</p>
            <ul>${htmlItens}</ul>
            <p><small>Total de raças curtas encontradas: ${racasFiltradas.length}</small></p>
        </div>
    `;
    }

    // Chamar a função quando o usuário clicar no botão da API
    document.querySelector('[data-section="api-extra"]').addEventListener('click', carregarLaboratorioDeDados);

    // Lógica de Navegação da SPA
    links.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-section');
            console.log("Navegando para:", target);

            sections.forEach(sec => {
                sec.classList.remove('active');
                sec.classList.add('hidden');

                if (sec.id === target) {
                    sec.classList.remove('hidden');
                    sec.classList.add('active');
                }
            });
        });
    });

    // Lógica do Botão Converter (Bases)
    const btnConverter = document.getElementById('btnConverter');
    const inputDecimal = document.getElementById('numDecimal');
    const displayResultado = document.getElementById('resultadoBases');

    if (btnConverter) {
        btnConverter.addEventListener('click', () => {
            const valor = inputDecimal.value;
            const dados = calc.converterDecimalParaBinario(valor);

            if (dados.erro) {
                displayResultado.innerHTML = `<p style="color:red">${dados.erro}</p>`;
                return;
            }

            // Usando MAP para criar a lista de passos (Programação Funcional)
            const htmlPassos = dados.passos.map(p => `
        <div class="passo-item">
            ${p.dividendo} ÷ 2 = ${p.quociente} | <strong>Resto: ${p.resto}</strong>
        </div>
    `).join('');

            displayResultado.innerHTML = `
        <div class="card-resultado">
            <h3>Resultado: <span class="destaque">${dados.resultado}</span></h3>
            <hr>
            <h4>Passo a Passo (Divisões):</h4>
            ${htmlPassos}
            <p><small>Leia os restos de baixo para cima para formar o binário.</small></p>
        </div>
    `;
        });
    }
});