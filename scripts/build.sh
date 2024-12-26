export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm use v18.19.1
npm install --force
rm dist -rf
echo "export const version = { number: '${GIT_COMMIT}' }" > src/version.ts
NG_PERSISTENT_BUILD_CACHE=1 ng build --base-href / --output-path="dist" --configuration="production"
