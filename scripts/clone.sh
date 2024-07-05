#!/bin/bash

# Check if enough arguments were provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <target-directory> <new-directory-name>"
    exit 1
fi

# Get parameters
TARGET_DIR=$1
NEW_DIR_NAME=$2

# Get the current directory name
CURRENT_DIR=$(basename "$PWD")

# Check if the target directory exists, create if it does not
if [ ! -d "$TARGET_DIR" ]; then
    echo "Target directory does not exist, creating now..."
    mkdir -p "$TARGET_DIR"
fi

# Full path for the new directory
FULL_NEW_DIR_PATH="$TARGET_DIR/$NEW_DIR_NAME"

# Check if the new directory already exists
if [ -d "$FULL_NEW_DIR_PATH" ]; then
    echo "Error: The directory $FULL_NEW_DIR_PATH already exists."
    exit 1
fi

# Exclude files specified in .gitignore and the .git directory
EXCLUDES=""
if [ -f .gitignore ]; then
    while read line; do
        EXCLUDES+="--exclude=$line "
    done < .gitignore
fi
EXCLUDES+="--exclude=.git"

# Use rsync to copy the directory excluding specified files
rsync -av --exclude-from='.gitignore' --exclude='.git' "$PWD/" "$FULL_NEW_DIR_PATH"

echo "Directory cloned successfully to $FULL_NEW_DIR_PATH."
