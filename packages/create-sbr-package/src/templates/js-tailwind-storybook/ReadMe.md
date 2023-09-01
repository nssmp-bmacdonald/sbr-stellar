# SBR Package

## Javscript + Tailwind + Storybook

Shared React components for SBR micro-frontends

`npm i @nssmp-bmacdonald/${PACKAGE_NAME}`

## Usage

For local development use storybook to view components

```sh
    npm install
    npm run storybook
```

When creating components follow the example folder structure provided

```
├── .storybook
├── src
│   ├── index.js
│   ├── components
│   │   ├── index.js
│   │   ├── Button
│   │   |   ├── index.js
│   │   |   ├── Button.css
│   │   |   ├── Button.stories.js
│   │   |   ├── Button.jsx
```

Update the `index.js` file at each folder structure to allow the consumer of the package easy access to the exposed components

---

Once ready to publish
`npm run package`

This will build the react component into the `/dist` folder for ES6 or CommonJS modules
The local enviroment must have proper .npmrc configuration to publish to the scoped repo...
