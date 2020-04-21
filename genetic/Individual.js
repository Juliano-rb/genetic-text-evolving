class Individual {
    /**
     *
     * @param {number} chromoLength
     */
    constructor(config) {
        this.MIN_GEN_NUMBER = 32;
        this.MAX_GEN_NUMBER = 164;
        this.MUTATION_RATE = config.mutationRate || 0.1;

        this.chromosome = this.generateChromosome(config.chromoLength);
        this.score = null;
        this.log = config.log || 0;
    }
    /**
     * Creates a new Individual from a string with cromossome info
     * @param {String} str
     * @returns {Individual} New Individual
     */
    static fromString(str) {
        const chromossome = str.split("").map((c) => c.charCodeAt());
        const individual = new Individual(str.length);
        individual.chromosome = chromossome;

        return individual;
    }
    /**
     * overrides the the default toString() method
     */
    toString() {
        return String.fromCharCode(...this.chromosome);
    }
    /**
     * Generates a valid chromosome string sequence
     * @param {Number} length
     * @returns {String} Chromosome
     */
    generateChromosome(length) {
        const getNewRandomCharCode = () => {
            const max = this.MAX_GEN_NUMBER;
            const min = this.MIN_GEN_NUMBER;

            const charCode = Math.floor(Math.random() * (max - min)) + min;
            return charCode;
        };

        let chromosome = [];

        while (chromosome.length < length) {
            const gene = getNewRandomCharCode();
            chromosome.push(gene);
        }

        return chromosome;
    }
    /**
     * Calculates the distance between this individual and the individual passed in parameter
     * @param {Individual} individual
     */
    distanceTo(individual) {
        const length =
            this.chromosome.length > individual.chromosome.length
                ? this.chromosome.length
                : individual.chromosome.length;

        let GlobalDiff = 0;

        for (let i = 0; i < length; i++) {
            let geneDiff = this.MAX_GEN_NUMBER - this.MIN_GEN_NUMBER; // max diff
            if (this.chromosome[i] && individual.chromosome[i]) {
                geneDiff = Math.abs(
                    this.chromosome[i] - individual.chromosome[i]
                );
            }
            GlobalDiff += geneDiff;
        }

        return GlobalDiff;
    }
    /**
     * Crosses this individual with the individual passed in parameter
     * @param {Individual} individual
     */
    crossoverWith(individual) {
        /**Randomly defines if a mutation will occur */
        const mutation = () => Math.random() < this.MUTATION_RATE;
        /**Do the mutation, randomly defines the mutated gene and the level of mutation*/
        const doMutation = (i) => {
            this.printLog("Mutation in chromosome: " + i.toString());
            const mutationPos = Math.floor(Math.random() * i.length);
            const mutateLevel = Math.floor(Math.random() * 5) - 2; // generate in range [-2,+2]

            i[mutationPos] += mutateLevel;
        };

        const CROSSOVER_POINT = 0.5;

        const fatherChromo = this.chromosome;
        const motherChromo = individual.chromosome;

        const sonChromo = [
            ...fatherChromo.slice(0, fatherChromo.length * CROSSOVER_POINT),
            ...motherChromo.slice(
                motherChromo.length * CROSSOVER_POINT,
                motherChromo.length
            ),
        ];

        const daughterChromo = [
            ...motherChromo.slice(0, motherChromo.length * CROSSOVER_POINT),
            ...fatherChromo.slice(
                fatherChromo.length * CROSSOVER_POINT,
                fatherChromo.length
            ),
        ];

        if (mutation()) {
            doMutation(sonChromo);
        }
        if (mutation()) {
            doMutation(daughterChromo);
        }

        const son = new Individual({
            chromoLength: sonChromo.length,
            log: this.log,
        });
        son.chromosome = sonChromo;
        const daughter = new Individual({
            chromoLength: daughterChromo.length,
            log: this.log,
        });
        daughter.chromosome = daughterChromo;

        return [son, daughter];
    }

    printLog(message) {
        if (this.log > 0) {
            console.log(message);
        }
    }
}

export default Individual;
