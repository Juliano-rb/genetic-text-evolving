import Individual from "./Individual.js";

class Genetic {
    constructor(config) {
        this.population = [];
        this.scores = []; // shape: [ {index:0, score:0}, ... ]
        this.populationSize = config.initPopSize;
        this.chromoLength = config.chromoLength;
        this.goalString = config.goalString;
    }
    setUp(config) {
        this.populationSize = config.initPopSize || this.populationSize;
        this.chromoLength = config.chromoLength || this.chromoLength;
        this.goalString = config.goalString || this.goalString;
    }

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
        const goalString = this.goalString;

        const goalIndividual = Individual.fromString(goalString);

        // amplitude é o intervalo def valores possivel para os genes do individuo (distancia maxima de um gene para outro)
        const individualAmplitude =
            goalIndividual.MAX_GEN_NUMBER - goalIndividual.MIN_GEN_NUMBER;
        // distancia máxima para os individuos em questão é o comprimento do maior * amplitude do individuo
        const MAX_DISTANCE =
            goalIndividual.chromosome.length > individual.chromosome.length
                ? goalIndividual.chromosome.length * individualAmplitude
                : individual.chromosome.length * individualAmplitude;

        const distance = goalIndividual.distanceTo(individual);
        const score = 1 - distance / MAX_DISTANCE;

        console.log(`Score of individual - ${individual.toString()}: ${score}`);

        return score;
    }

    generateNewIndividual(chromoLength) {
        return new Individual(chromoLength);
    }
}

export default Genetic;
