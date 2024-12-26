export DEPLOY_DIR="/opt/elex-ui"

rm $DEPLOY_DIR/dist -rf
mv dist $DEPLOY_DIR/
echo "${GIT_COMMIT}" > $DEPLOY_DIR/dist/assets/version.txt
curl -i https://eapi.vitas.dev/version
