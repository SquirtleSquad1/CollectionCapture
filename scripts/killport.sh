#!/bin/bash

# Find the process using port 3000
process=$(sudo lsof -t -i:3000)

# Check if the process is running
if [[ -z $process ]]
then
  echo "No process is using port 3000"
else
  # Kill the process
  sudo kill $process
  echo "Process with ID $process has been killed"
fi
