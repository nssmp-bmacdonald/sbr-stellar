# Shared React Components

react/react-dom are peerDeps so the comsuming project is required to have them,
but this component library does not provide them, as they are not listed as direct deps.

{
"name": "@nssmp-bmacdonald/sbr-components",
"version": "1.0.0",
"description": "Shared SBR react components",
"main": "dist/index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build",
"build": "rollup -c"
},
"keywords": [],
"author": "",
"license": "ISC",
"devDependencies": {
"@babel/preset-env": "^7.22.10",
"@babel/preset-react": "^7.22.5",
"@storybook/addon-essentials": "^7.3.2",
"@storybook/addon-interactions": "^7.3.2",
"@storybook/addon-links": "^7.3.2",
"@storybook/addon-onboarding": "^1.0.8",
"@storybook/blocks": "^7.3.2",
"@storybook/react": "^7.3.2",
"@storybook/react-webpack5": "^7.3.2",
"@storybook/testing-library": "^0.2.0",
"prop-types": "^15.8.1",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"storybook": "^7.3.2",
"rollup": "^2.38.4",
"rollup-plugin-babel": "^4.4.0",
"rollup-plugin-peer-deps-external": "^2.2.4",
"rollup-plugin-postcss": "^4.0.0",
"rollup-plugin-terser": "^7.0.2",
"babel-loader": "^8.2.2"
},
"peerDependencies": {
"react": "^18.2.0",
"react-dom": "^18.2.0"
}
}
