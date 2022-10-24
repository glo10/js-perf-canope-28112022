# Exercice 10 : Typer notre code back-end avec TypeScript

1. Transformez vos fichiers `.js` en `.ts` uniquement pour la partie `back-end`.
2. Appliquez les types à l'aide de `TypeScript`.
3. Configurez `TypeScript` pour compiler tous les fichiers `.ts` en `.js` dans un dossier de sortie nommé `dist`.

## Spécifications techniques

1. Créez le fichier tsconfig.json avec le contenu suivant  en remplaçant `path/to/your/source` par le lien vers le dossier contenant vos sources JS : 
`{
  "compilerOptions": {
    "module": "NodeNext",
    "esModuleInterop": true,
    "outDir": "dist",
    "target": "es6",
    "strict": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "dist"
  ]
}`

2. Installez ts standard et supprimez standard :
- `npm uninstall standard && npm i -D ts-standard`

3. Installez les fichiers de definitions de types des modules suivants bcrypt :
- `npm i -D @types/bcrypt`