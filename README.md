# Debtwire Microfrontends example

## Running locally

You need to run both the container and search services

```
cd container
node index.js

cd ../search
yarn build:prod && node index.js
```

Then go to `http://localhost:3000/`

