import Genetic from "./genetic/Genetic.js";
import Orchestrator from "./genetic/Orchestrator.js";

document.getElementById("input-text").value = "Juliano";

document.getElementById("btn-start").onclick = (e) => {
    const initialPopulationSize = 200;
    const goal = document.getElementById("input-text").value;
    const chromosomeLength = goal.length;

    const config = {
        initPopSize: initialPopulationSize,
        chromoLength: chromosomeLength,
        goalString: goal,
    };

    const orch = new Orchestrator(Genetic, {
        updateMethod: Orchestrator.UPDATE_METHOD.eachGeneration,
        outputFunction: function (el) {
            document.getElementById("output-text").value = el;
        },
    });
    orch.initializeModel(config);

    globalGenetic = orch.genetic;
    orch.start();
};

/**
 * todo salvar scores nos individuos ou criar uma forma facil de saber os scores
 * analisar se a mutação esta funcionando, pois esta estagnando
 */
