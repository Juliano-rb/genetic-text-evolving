import Individual from "./Individual.js";

class Genetic {
    constructor(initialPopulationSize) {
        this.population = [];
        this.populationSize = initialPopulationSize;
    }

    start(chromoLength) {
        this.chromoLength = chromoLength;
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

    calculateFitness(individual) {
        const goalChromo = document.getElementById("input-text").value;
        const individualChromo = individual.chromosome;
        const length = goalChromo.length;
        let equalGenes = 0;

        for (let i = 0; i < length; i++) {
            if (goalChromo[i] === individualChromo[i]) {
                equalGenes++;
            }
        }
        return equalGenes / length;
    }

    generateNewIndividual(chromoLength) {
        return new Individual(chromoLength);
    }
}

export default Genetic;
