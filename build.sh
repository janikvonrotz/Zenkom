# chmod +x build.sh
rm -rf .build
forever stopall
meteor build .build
tar -zxf .build/Zenkom.tar.gz -C .build
cd .build/bundle/programs/server
npm install --production
cd ../..
MONGO_URL='mongodb://zenkom:dp8e36APuASgSWum7uLz@ds121190.mlab.com:21190/zenkom' ROOT_URL='https://zenkom.bitsherpa.com' METEOR_SETTINGS=$(cat ../../settings-dev.json) PORT=3000 forever start main.js
