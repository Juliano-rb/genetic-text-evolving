import Individual from "./Individual.js";

class Genetic {
    constructor(populationSize, chromoLength) {
        this.population = [];
        this.populationSize = populationSize;
        this.chromoLength = chromoLength;
    }

    start() {
        this.generatePopulation(this.populationSize);
    }

    /**
     * @param {numeric} populationSize
     */
    generatePopulation(populationSize) {
        console.log("Generating initial population...");
        while (this.population.length < populationSize) {
            const newIndividual = this.generateNewIndividual(this.chromoLength);
            this.population.push(newIndividual);
        }

        console.log("Done");
    }

    generateNewIndividual(chromoLength) {
        return new Individual(chromoLength);
    }
}

export default Genetic;
