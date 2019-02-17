# Setup Docker

 - `docker-compose up` to start (`-d` for dettached)
 - `docker-compose down` to stop and clean
 - `nodered-data` directory is mounted in `/data` in nodered container, here is where `flows.json` and other data (positions) is loaded/saved. You have to
 give read+write permission to the container, in order to avoid confusion give access to all users with: 
 
 `chmod a+rwx -R nodered-data`

