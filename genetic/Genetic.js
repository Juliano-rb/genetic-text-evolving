import Individual from "./Individual.js";

class Genetic {
    constructor(config) {
        this.population = [];
        this.populationSize = config.initPopSize;
        this.chromoLength = config.chromoLength;
        this.goalString = config.goalString;
        this.selectionRate = config.selectionRate || 0.6;
        this.log = config.log || 0;
    }
    setUp(config) {
        this.populationSize = config.initPopSize || this.populationSize;
        this.chromoLength = config.chromoLength || this.chromoLength;
        this.goalString = config.goalString || this.goalString;
        this.selectionRate = config.selectionRate || 0.6;
    }

    generatePopulation() {
        this.printLog("Generating initial population...");
        while (this.population.length < this.populationSize) {
            const newIndividual = this.generateNewIndividual(
                this.chromoLength,
                this.log - 1
            );
            this.population.push(newIndividual);
        }

        this.printLog("Done");
    }

    calculateScores() {
        this.printLog("Calculating population scores...");

        this.population.forEach((individual, index) => {
            individual.score = this.calculateFitness(individual);
        });

        this.printLog("Done");
    }

    calculateFitness(individual) {
        const goalString = this.goalString;

        const goalIndividual = Individual.fromString(goalString);

        // amplitude é o intervalo de valores possivel para os genes do individuo (distancia maxima de um gene para outro)
        const individualAmplitude =
            goalIndividual.MAX_GEN_NUMBER - goalIndividual.MIN_GEN_NUMBER;
        // distancia máxima para os individuos em questão é o comprimento do maior * amplitude do individuo
        const MAX_DISTANCE =
            goalIndividual.chromosome.length > individual.chromosome.length
                ? goalIndividual.chromosome.length * individualAmplitude
                : individual.chromosome.length * individualAmplitude;

        const distance = goalIndividual.distanceTo(individual);
        const score = 1 - distance / MAX_DISTANCE;

        return score;
    }

    selection() {
        this.printLog("Starting selection...");

        let newPopulation = [...this.population];
        newPopulation.sort((a, b) => (a.score > b.score ? -1 : 1));

        newPopulation = newPopulation.slice(
            0,
            this.populationSize * this.selectionRate
        );

        this.population = newPopulation;

        this.printLog("Done");
    }

    crossover() {
        this.printLog("Starting crossover...");
        const childrens = [];
        const remainingIndividuals = [...this.population];

        /**
         * Não repete individuos
         */
        while (remainingIndividuals.length > 0) {
            const father = remainingIndividuals.shift();

            remainingIndividuals.forEach((mother, i) => {
                childrens.push(...father.crossoverWith(mother));
            });
        }

        const newPopulation = [...this.population, ...childrens];
        this.population = newPopulation;
        this.printLog("Done");
    }

    generateNewIndividual(chromoLength, logLevel = 0) {
        return new Individual({
            chromoLength: chromoLength,
            log: this.log - 1,
        });
    }

    printLog(message) {
        if (this.log > 0) {
            console.log(message);
        }
    }
}

export default Genetic;
