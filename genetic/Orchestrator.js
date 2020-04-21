class Orchestrator {
    /**
     *
     * @param {Genetic} geneticModel Implementation of a genetic following the standard
     */
    constructor(geneticModel) {
        this.geneticModel = geneticModel;
    }

    initializeModel(config) {
        this.genetic = new this.geneticModel(config);
    }

    start() {
        this.genetic.generatePopulation();
        this.genetic.calculateScores();

        const generations = 200;
        let generationCount = 0;
        while (generationCount < generations) {
            document.getElementById(
                "output-text"
            ).value = this.genetic.population[0].toString();

            console.log("Generation " + generationCount);
            this.newGeneration();

            generationCount += 1;
        }

        this.genetic.selection();
    }

    newGeneration() {
        // rever a seleção para filtrar uma quantidade fixa
        this.genetic.selection();
        this.genetic.crossover();
        this.genetic.calculateScores();
    }
}

export default Orchestrator;
