# Setup Demo - Docker

 - Download https://interiot:interiot1234@files.inter-iot.eu/documents/docker/interiot.proton.tar
 - `docker load < interiot.proton.tar`
 - `cd docker-images/nodered && docker build --no-cache -t interiot/nodered .`
 - `docker-compose up` to start (`-d` for dettached)
 - `docker-compose down` to stop and clean
 - `nodered-data` directory is mounted in `/data` in nodered container, here is where `flows.json` and other data (positions) is loaded/saved. You have to
 give read+write permission to the container, in order to avoid confusion give access to all users with: `chmod a+rwx -R nodered-data`

# Setup Demo - Nodered

 - For some reason, open any deployed `sth` node, edit server and save + deploy (without changing anything)
 - In `ORION SETUP` tab, start flows: `orion setup` and `feed portcalls` if you want sth to have already data for each truck.

 # Observations

 Don't use hardcoded IP's, please. The containers can see each other through the same network, and the hostnames are: `orion`, `fiware-sth`, etc. 
 Check the `alias` section in each service of `docker-compose.yml`.

**Note: We should change latest versions by fixed tags.**