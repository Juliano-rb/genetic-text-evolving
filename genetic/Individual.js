class Individual {
    /**
     *
     * @param {number} chromoLength
     */
    constructor(chromoLength) {
        this.MAX_GEN_NUMBER = 127;
        this.MIN_GEN_NUMBER = 32;

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
}

export default Individual;
