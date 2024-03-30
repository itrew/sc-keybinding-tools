# Star Citizen Control Utility

## Extracting the latest data

In order to extract the latest data from the game, the [`unp4k`](https://github.com/dolkensp/unp4k) utility is required.
Create an `unp4k` folder at the root of this project, and copy the downloaded and extracted utility folder within it
(e.g. `unp4k/unp4k-suite-v3.13.21/`). You can then extract the required files using `./bin/unpack_data.sh` or `npm run
extract` (just a pointer to the shell script). This will delete and overwrite the previously extracted files into the
`src/lib/data/extracted-files` directory for source control to track changes.
