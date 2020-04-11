import Genetic from "./genetic/Genetic.js";

const genetic = new Genetic(100, 30);

genetic.start();

document.getElementById("input-text").value = "Meu nome é ";

console.log(genetic.calculateFitness(individual));
