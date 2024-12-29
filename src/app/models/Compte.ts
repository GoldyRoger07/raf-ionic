export class Compte{
    constructor(
        public idCompte = "",
        public username = "",
        public email = "",
        public nom = "",
        public prenom = "",
        public password = "",
        public telephone = "",
        public urlPhotoProfile = "no-image",
        public solde = 0,
        public role = "",
        public actif = true,
    ){}
}