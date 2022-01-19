# View Spot Finder (Code Challenge)

## Execute Scripts for Testing

### Mesh Tests

In the project directory, you can run:

#### `npm run serve`

This will build the app *.ts files to *.js files (TSC) and will run command `node ./dist/index.js ../mesh.json 20`.

This will return the 20th highest view spots for small mesh.json

#### `npm run serveBig`

This will build the app *.ts files to *.js files (TSC) and will run command `node ./dist/index.js ../mesh_x_sin_cos_10000.json 25`.

This will return the 25th highest view spots for medium mesh.json

#### `npm run serveBigger`

This will build the app *.ts files to *.js files (TSC) and will run command `node ./dist/index.js ../mesh_x_sin_cos_20000.json 25`.

This will return the 25th highest view spots for big mesh.json

### Exception tests

#### `npm test1`

This will build the app *.ts files to *.js files (TSC) and will run command `node ./dist/index.js`.

This will test if no arguments are given

#### `npm test1`

This will build the app *.ts files to *.js files (TSC) and will run command `node ./dist/index.js 25`.

This will test if mesh.json is missing

#### `npm test1`

This will build the app *.ts files to *.js files (TSC) and will run command `node ./dist/index.js ../mesh.json`.

This will test if counter for view spots is missing


## View Spot App

### Execute app and get results

`node ./release/index.js <relative path to mesh.json> <count of view spots>`

This will execute the app and will return the hiughest view spots

#### Arguments:

- relative path to mesh.json
  - e.g. ../mesh.json if the json file is at the parent folder
  - e.g. ../../mesh.json if the json file is at the parents parent folder
  - e.g. ./mesh.json if the json file is at the current folder
  - e.g. ./meshfiles/mesh.json if the json file is at the child folder meshfiles
- count of view spots
  - must be a valid number

#### Logging

Output to console will be only the result of spost. if output is empty, errors will be logged to logfile logSpotFinder.log