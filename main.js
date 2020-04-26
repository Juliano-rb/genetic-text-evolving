import Genetic from "./genetic/Genetic.js";
import Orchestrator from "./genetic/Orchestrator.js";

document.getElementById("btn-start").onclick = (e) => {
    const goal = document.getElementById("input-text").value;
    const chromosomeLength = goal.length;

    const config = {
        initPopSize: 200,
        chromoLength: chromosomeLength,
        goalString: goal,
    };

    const genetic = new Genetic(config);

    const orch = new Orchestrator(genetic, {
        maxGenerations: 400,
        stopCriteria: Orchestrator.STOP_CRITERIA.convergence,
        updateMethod: Orchestrator.UPDATE_METHOD.eachGeneration,
        outputFunction: function (el) {
            document.getElementById("output-text").value = el;
        },
        log: 2,
    });

    globalGenetic = orch.genetic;
    orch.start();
};

/**
 * ver melhor a versão de update html (lenta) e a questão do update a cada geração
 */
