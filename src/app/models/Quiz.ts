import { Duree } from "./Duree";
import { Sujet } from "./Sujet";

export class Quiz{
    constructor(
        public id = 0,
        public titre = "",
        public description = "",
        public dateDebut = new Date(),
        public dateFin = new Date(),
        public duree = new Duree(),
        public prix = 0,
        public prime = 0,
        public tempsParPartie = 0,
        public sujet = new Sujet(),
        public isFinish = false,
        public bestScore = 0
    ){}
}