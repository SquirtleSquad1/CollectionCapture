#!/bin/bash

# Find the process using port 3000
process=$(lsof -t -i:3000)

# Check if the process is running
if [[ -z $process ]]
then
  echo "No process is using port 3000"
else
  # Kill the process
  kill $process
  echo "Process with ID $process has been killed"
fi
