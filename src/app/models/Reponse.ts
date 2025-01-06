import { Question } from "./Question";

export class Reponse{
    constructor(
        public id = 0,
        public value = "",
        public isGood = false,
        public question = new Question()
    ){}
}