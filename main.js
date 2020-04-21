import Genetic from "./genetic/Genetic.js";
import Orchestrator from "./genetic/Orchestrator.js";

document.getElementById("input-text").value = "Juliano";

const initialPopulationSize = 200;
    const goal = document.getElementById("input-text").value;
    const chromosomeLength = goal.length;

    const config = {
        initPopSize: initialPopulationSize,
        chromoLength: chromosomeLength,
        goalString: goal,
    };

const orch = new Orchestrator(Genetic);
orch.initializeModel(config);

globalGenetic = orch.genetic;

document.getElementById("btn-start").onclick = (e) => {
    orch.start();
};
