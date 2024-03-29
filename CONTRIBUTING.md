# List of Available Commands
These commands will be available after you run `yarn install` upon first cloning the repository.

## Commonly Used
* `yarn clean` Remove (automatically-generated) temporary files. This does not include `.draft` files and folders.
* `yarn lint` Checks code for problems
* `yarn debug` Run a test on the unbundled code only
* `yarn test` Run tests both unbundled and bundled code
* `yarn build` Equivalent of `yarn rollup` && `yarn types` && `yarn api`
* `yarn all` Equivalent of `yarn clean` && `yarn lint:fix` && `yarn build` && `yarn test` && `yarn pack`

<br/>

## Other Commands
* `yarn lint:fix` Checks code for problems and automatically apply fixes where possible
* `yarn test:bundled` Run tests on the builds for CJS, ES and UMD only
* `yarn rollup` Bundles the code into several builds: CJS, ES, React Native and UMD
* `yarn types` Generate type declarations in the `temp` folder
* `yarn api:main` Bundle type declarations from `yarn types` into one file
* `yarn api:react` Bundle type declarations for React from `yarn types` into one file
* `yarn api` Equivalent of `yarn api:main` && `yarn api:react`

<br/>

# Drafts
You can create files such as `index.draft.js`,  `notes.draft.md`, or `folder.draft` locally — they have been configured to be ignored by git.

<br/>
