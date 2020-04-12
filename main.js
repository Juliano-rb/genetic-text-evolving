import Genetic from "./genetic/Genetic.js";

import Individual from "./genetic/Individual.js";

document.getElementById("input-text").value = "Juliano";

document.getElementById("btn-start").onclick = (e) => {
    const initialPopulationSize = 10;
    const goal = document.getElementById("input-text").value;
    const chromosomeLength = goal.length;

    const config = {
        initPopSize: initialPopulationSize,
        chromoLength: chromosomeLength,
        goalString: goal,
    };

    const genetic = new Genetic(config);

    genetic.generatePopulation();
    genetic.calculateScores();
    genetic.selection();

    console.log("endded");
};
