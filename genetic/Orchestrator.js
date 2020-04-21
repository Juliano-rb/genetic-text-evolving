class Orchestrator {
    static UPDATE_METHOD = {
        eachGeneration: "eachGeneration",
        inTheEnd: "inTheEnd",
    };

    /**
     * @param {Genetic} geneticModel Implementation of a genetic following the standard
     */
    constructor(geneticModel, config = {}) {
        //ouputFunction
        this.geneticModel = geneticModel;

        this.updateMethod =
            config.updateMethod || Orchestrator.UPDATE_METHOD.inTheEnd;
        this.outputFunction =
            config.outputFunction ||
            function (el) {
                console.log(el);
            };
    }

    initializeModel(config) {
        this.genetic = new this.geneticModel(config);
    }

    start() {
        this.genetic.generatePopulation();
        this.genetic.calculateScores();

        const generations = 200;
        let generationCount = 0;

        const generation = () => {
            this.outputFunction(this.genetic.population[0].toString());

            //console.log("Generation " + generationCount);

            this.newGeneration();

            generationCount += 1;
            if (generationCount < generations) {
                if (
                    this.updateMethod ===
                    Orchestrator.UPDATE_METHOD.eachGeneration
                ) {
                    setTimeout(() => {
                        generation();
                    }, 100);
                } else {
                    generation();
                }
            }
        };

        generation();
    }

    newGeneration() {
        this.genetic.selection();
        this.genetic.crossover();
        this.genetic.calculateScores();
    }
}

export default Orchestrator;
