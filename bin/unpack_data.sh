#!/usr/bin/bash
#
# This script extracts the latest data files needed from the Data.p4k file.

# Remove previous copies of extracted data.
rm -rf "unp4k/Data/"
rm -rf "src/data/game-files"

cd unp4k

# Unpack the neccessary files from the Data.p4k file.
./unp4k-suite-v3.13.21/unp4k.exe "/y/Roberts Space Industries/StarCitizen/LIVE/Data.p4k" defaultProfile.xml
./unp4k-suite-v3.13.21/unp4k.exe "/y/Roberts Space Industries/StarCitizen/LIVE/Data.p4k" english/global.ini

# Decode the XML files.
./unp4k-suite-v3.13.21/unforge.exe "Data/Libs/Config/defaultProfile.xml"

cd ..

# Make a directory where the extracted files will be copied to for source control.
mkdir -p "src/data/game-files"

# Copy the extracted and decoded files to a tracked folder.
cp "unp4k/Data/Libs/Config/defaultProfile.xml" "src/data/game-files/defaultProfile.xml"
cp "unp4k/Data/Localization/english/global.ini" "src/data/game-files/global.ini"
