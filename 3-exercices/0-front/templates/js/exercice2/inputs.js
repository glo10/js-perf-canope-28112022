export const signinElements = [
  {
    el : 'input[type=email]',
    name: 'Email',
    msg: 'Veuillez saisir votre adresse e-mail !'
  },
  {
    el : 'input[type=password]',
    name: 'Mot de passe',
    msg: 'Veuillez saisir votre mot de passe !'
  },
]

export const signupElements = [
  {
    el : 'input[name=l-name]',
    name: 'Nom',
    msg: 'Veuillez saisir votre nom !'
  },
  {
    el : 'input[name=f-name]',
    name: 'Prénom',
    msg: 'Veuillez saisir votre prénom !'
  },
  ...signinElements,
  {
    el : 'input[name=confirm]',
    name: 'Confirmation du mot de passe',
    msg: 'Veuillez confirmer votre mot de passe !'
  },
  {
    el : 'input[name=age]',
    name: 'Age',
    msg: 'Veuillez saisir votre age !'
  },
  {
    el : 'input[name=country]',
    name: 'Pays',
    msg: 'Veuillez saisir le pays !'
  },
  {
    el : 'input[name=city]',
    name: 'Ville',
    msg: 'Veuillez saisir la ville !'
  }
]