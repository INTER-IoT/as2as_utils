# node-red-contrib-position-simu

This package provides 2 position simulation nodes: `position` node and `position action` node. This nodes will read positions from a file and start feeding them in a flow.

*Right now, the node loops over and over again in the file, this will change and you can
control if you want to loop or not.*

## USAGE

After placing any of the `position` or `position action` nodes you will have to add position
configuration consisting of:

 - **Name**: Name of the position simulator
 - **File Path**: Complete path to the file with a **specific** format that can be seen in `positions.txt` file (space separated `lat lon timeout` format)
 - **UUID**: For the moment do not modify it
 - **Extra**: Other data in JSON format that will be parsed and added in `msg.payload.data`

### position node

This node will feed positions in `msg.payload.location` with the `{lat, lon}` format. The time between new positions
is specified in the positions file (`timeout` is the number of milliseconds to wait).

### position action node

This node controls the `position` node. There are three actions available right now:

 - `start`: read the file (1st time) and `position` node will start feeding positions
 - `pause`: stop sending positions but remember the index
 - `stop`: stop sending positions and start over again