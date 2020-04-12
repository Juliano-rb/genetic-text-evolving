import Genetic from "./genetic/Genetic.js";

import Individual from "./genetic/Individual.js";

const ind1 = Individual.fromString("Juliano");
const ind2 = Individual.fromString("Juliann");

console.log(ind1.toString());
console.log(ind2.toString());

console.log("distance = " + ind2.distanceTo(ind1));

document.getElementById("input-text").value = "Juliano";

document.getElementById("btn-start").onclick = (e) => {
    const initialPopulationSize = 100;
    const goal = document.getElementById("input-text").value;
    const chromosomeLength = goal.length;

    const config = {
        initPopSize: 100,
        chromoLength: chromosomeLength,
        goalString: document.getElementById("input-text").value,
    };

    const genetic = new Genetic(config);

    genetic.generatePopulation();
    //genetic.calculateScores();

    console.log("Fitness" + genetic.calculateFitness(ind1));

    console.log("endded");
};
