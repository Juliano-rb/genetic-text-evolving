class Individual {
    /**
     *
     * @param {number} chromoLength
     */
    constructor(chromoLength) {
        this.chromosome = this.generateChromosome(chromoLength);
    }

    toString() {
        return this.chromosome;
    }

    generateChromosome(length) {
        const getNewRandomChar = () => {
            const max = 127;
            const min = 32;

            const charCode = Math.floor(Math.random() * (max - min)) + min;
            return String.fromCharCode(charCode);
        };

        let chromosome = "";

        while (chromosome.length < length) {
            const gene = getNewRandomChar();
            chromosome = chromosome.concat(gene);
        }
        return chromosome;
    }
}

export default Individual;
