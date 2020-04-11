import Individual from "./Individual.js";

class Genetic {
    constructor() {
        this.population = [];
    }

    init(populaitonSize) {}

    /**
     *
     * @param {numeric} populaitonSize
     */
    generatePopulation(populaitonSize) {}

    generateNewIndividual(chromoLength) {
        return new Individual(chromoLength);
    }
}

export default Genetic;
