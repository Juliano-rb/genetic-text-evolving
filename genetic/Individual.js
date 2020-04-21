class Individual {
    /**
     *
     * @param {number} chromoLength
     */
    constructor(chromoLength) {
        this.MAX_GEN_NUMBER = 127;
        this.MIN_GEN_NUMBER = 32;

        this.MUTATION_RATE = 0.1;

        this.chromosome = this.generateChromosome(chromoLength);
    }

    static fromString(str) {
        const chromossome = str.split("").map((c) => c.charCodeAt());
        const individual = new Individual(str.length);
        individual.chromosome = chromossome;

        return individual;
    }

    toString() {
        return String.fromCharCode(...this.chromosome);
    }

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
     *
     * @param {Individual} individual
     */
    crossoverWith(individual) {
        const mutation = () => Math.random() < this.MUTATION_RATE;
        const doMutation = (i) => {
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
            //console.warn("Mutation");
            doMutation(sonChromo);
        }
        if (mutation()) {
            //console.warn("Mutation");
            doMutation(daughterChromo);
        }

        const son = new Individual(sonChromo.length);
        son.chromosome = sonChromo;
        const daughter = new Individual(daughterChromo.length);
        daughter.chromosome = daughterChromo;

        return [son, daughter];
    }
}

export default Individual;
