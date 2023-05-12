#!/bin/bash
#bash scripts/build.sh "production"

IFS=' '
read -a args <<< "$1"

export NVM_DIR="/home/vitaly/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm use v16.14

npm install --force
rm dist -rf
echo "export const version = { number: '${GIT_COMMIT}' }" > src/version.ts
ng build --base-href / --output-path="dist" --configuration="${args[0]}"
