import { Compte } from "./Compte";
import { Quiz } from "./Quiz";

export class Partie{
    constructor(
        public id = 0,
        public compte = new Compte(),
        public quiz = new Quiz(),
        public dateDebut = new Date(),
        public dateFin = new Date(),
        public score = 0,
        public isFinish = false,
        public isStart = false,
    ){}
}