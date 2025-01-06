import { Sujet } from "./Sujet";

export class Question{
    constructor(
        public id = 0,
        public value = "",
        public imageUrl = "no-image",
        public sujet = new Sujet()
    ){}
}