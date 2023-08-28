# Micro-Frontends

NPM configuration file located on local machine `~/.npmrc` should contain github packages auth token
Temporarily placing inside project

```sh
@nssmp-bmacdonald:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${AUTH_TOKEN}
```

## Shared NPM package

Build dependency
When the shared package is updated:

- A new version of package must be published
- All consuming projects must be updated to use new version
- The consuming projects must then be rebuilt and re-deployed

## Module Federation

Run time dependecies

Hosts:

Remotes:

- Shared components live inside the remote
- They expose modules to be consumed by the host/remotes

An app can both expose and consume federated modules
