export class ApiService {
    constructor() {
        // API segura (HTTPS) e pública
        this.baseUrl = "https://dog.ceo/api/breeds/list/all";
    }

    async buscarRacas() {
        try {
            const response = await fetch(this.baseUrl);
            if (!response.ok) throw new Error("Erro ao carregar API");
            
            const dados = await response.json();
            // A API retorna um objeto onde as chaves são os nomes das raças
            return Object.keys(dados.message); 
        } catch (error) {
            console.error("Falha na requisição:", error);
            return [];
        }
    }
}