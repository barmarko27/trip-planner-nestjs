#!/bin/sh

if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
  echo "node_modules folder not found, creating it and installing dependencies."
  mkdir node_modules
  yarn install --frozen-lockfile
else
  echo "node_modules folder found, skipping install."
fi

yarn start:dev
