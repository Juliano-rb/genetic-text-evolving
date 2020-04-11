import Individual from "./Individual.js";

class Genetic {
    constructor(config) {
        this.population = [];
        this.scores = []; // shape: [ {index:0, score:0}, ... ]
        this.populationSize = config.initPopSize;
        this.chromoLength = config.chromoLength;
    }
    /**
     * @param {numeric} populationSize
     */
    generatePopulation() {
        console.log("Generating initial population...");
        while (this.population.length < this.populationSize) {
            const newIndividual = this.generateNewIndividual(this.chromoLength);
            this.population.push(newIndividual);
        }

        console.log("Done");
    }

    calculateScores() {
        console.group("Calculating population scores...");

        this.scores = [];
        this.population.forEach((individual, index) => {
            const score = this.calculateFitness(individual);
            this.scores.push({ index: index, score: score });
        });

        console.groupEnd("Calculating population scores...");
    }

    calculateFitness(individual) {
        const goalString = document.getElementById("input-text").value;

        const goalIndividual = Individual.fromString(goalString);

        const distance = goalIndividual.distanceTo(individual);

        const score = distance;
        console.log(`Score of individual - ${individualChromo}: ${score}`);

        return score;
    }

    generateNewIndividual(chromoLength) {
        return new Individual(chromoLength);
    }
}

export default Genetic;
