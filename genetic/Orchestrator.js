class Orchestrator {
    static UPDATE_METHOD = {
        eachGeneration: "eachGeneration",
        inTheEnd: "inTheEnd",
    };

    static STOP_CRITERIA = {
        convergence: (context) => {
            return context.bestIndividual
                ? context.bestIndividual.score >= 1
                : false;
        },
        none: () => false,
    };

    /**
     * @param {Genetic} geneticModel Implementation of a genetic following the standard
     */
    constructor(geneticModel, config = {}) {
        this.updateMethod =
            config.updateMethod || Orchestrator.UPDATE_METHOD.inTheEnd;
        this.outputFunction =
            config.outputFunction ||
            function (el) {
                console.log(`Best individual: ${el}`);
            };
        this.stopCriteria =
            config.stopCriteria || Orchestrator.STOP_CRITERIA.none;

        this.log = config.log || 0;
        this.maxGenerations = config.maxGenerations || 100;
        this.bestIndividual = null;

        this.genetic = geneticModel;
        this.genetic.log = this.log - 1;
    }

    start() {
        this.genetic.generatePopulation();
        this.genetic.calculateScores();

        let generationCount = 0;

        const generation = () => {
            this.printLog("Generation " + generationCount);

            this.newGeneration();

            generationCount += 1;

            const generationStop = () =>
                this.maxGenerations
                    ? generationCount < this.maxGenerations
                    : true;

            if (!this.stopCriteria(this) && generationStop()) {
                if (
                    this.updateMethod ===
                    Orchestrator.UPDATE_METHOD.eachGeneration
                ) {
                    setTimeout(() => {
                        generation();
                        this.outputFunction(
                            this.genetic.population[0].toString()
                        );
                    }, 50);
                } else {
                    generation();
                }
            }
        };

        generation();

        if (this.updateMethod === Orchestrator.UPDATE_METHOD.inTheEnd) {
            this.outputFunction(this.genetic.population[0].toString());
        }
    }

    newGeneration() {
        this.genetic.selection();
        this.genetic.crossover();
        this.genetic.calculateScores();

        this.bestIndividual = this.genetic.population[0];
    }

    printLog(message) {
        if (this.log > 0) {
            console.log(message);
        }
    }
}

export default Orchestrator;
