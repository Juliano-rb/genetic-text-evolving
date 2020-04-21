class Orchestrator {
    static UPDATE_METHOD = {
        eachGeneration: "eachGeneration",
        inTheEnd: "inTheEnd",
    };

    /**
     * @param {Genetic} geneticModel Implementation of a genetic following the standard
     */
    constructor(geneticModel, config = {}) {
        this.log = config.log || 0;
        this.updateMethod =
            config.updateMethod || Orchestrator.UPDATE_METHOD.inTheEnd;
        this.outputFunction =
            config.outputFunction ||
            function (el) {
                console.log(el);
            };
    }

        this.genetic.log = this.log - 1;
    }

    start() {
        this.genetic.generatePopulation();
        this.genetic.calculateScores();

        const generations = 200;
        let generationCount = 0;

        const generation = () => {
            this.printLog("Generation " + generationCount);

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

    printLog(message) {
        if (this.log > 0) {
            console.log(message);
        }
    }
}

export default Orchestrator;
