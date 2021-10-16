# ID_API

# SpaceX: StarLink - Three.js globe

## Doelstellingen:

- Interactieve kaart die kan gedraaid worden (3D)
- Mogelijkheid om op een satelliet te drukken en in te zoomen naar die satelliet
- Je dichtstbijzijnde satelliet zoeken
- (evt. dag- en nachtmodus toevoegen indien genoeg tijd)

# WorkFlow

## Initialisation

### Gitignore.io

- .gitignore
  ```

  ```

```bash
npm init
```

```bash
npm install clean-css-cli node-sass postcss postcss-cli postcss-prefixer --save-dev
```

```bash
npm install webpack webpack-cli --save-dev
```

1. Mappen aanmaken:
   1. dist
   2. scss

### Dependencies uitvoeren in package

in **package.json** moet je de lijn "test" vervangen met deze code zodat we deze kunnen gebruiken wanneer we "**npm run dev**" en "**npm run build**" uitvoeren in de terminal.

```json
"clean": "rimraf dist",
"compile": "node-sass --output-style=expanded --source-map=true scss/screen.scss dist/screen.css",
"prefix": "postcss dist/screen.css -u postcss-prefixer -o dist/screen.css",
"minify": "cleancss --level=1 --source-map --source-map-inline-sources --output dist/screen.min.css dist/screen.css",
"dev": "npm run compile -- --watch",
"build": "npm run clean && npm run compile && npm run prefix && npm run minify && webpack"
```

### Pas je package.json aan

1. voeg toe ⇒ "private": true,
2. verwijder ⇒ "main": "index.js",
3. voeg toe aan build ⇒ && webpack

![API%20c252bd0b2e894740a5705a2106d21312/Screenshot_2021-01-07_at_16.31.19.png](API%20c252bd0b2e894740a5705a2106d21312/Screenshot_2021-01-07_at_16.31.19.png)

### Webpack.config.js

Maak een nieuwe file aan: webpack.config.js

```jsx
const path = require("path");
module.exports = {
  entry: "./js/scripts.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```
