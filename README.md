# Setup

## Requirements:
* This project is configured to use VSCode Dev Containers.
    * Dev Containers requires Docker Desktop
* If not running inside of the container, Node is required. It was tested on Node V20.12.0.

## How to run the project:
1. After cloning, and optionally opening inside the provided dev container, run do_setup.sh. 
2. After installation is complete, run startup.sh
3. Open localhost:3000 in your browser

## Notes:
If for whatever reason shell files cannot be executed, two terminal windows can be opened, one into the server subdirectory, the other into the client subdirectory. 

Perform npm install in both terminals.

Starting with the server terminal, run npm start, then repeat for the client terminal.