#!/usr/bin/python3
# REGIONS ARE NOT DYNAMICALLY GIVEN A COORDINATE LOCATION DUE TO WIKI STRUCTURE
# There are probably better ways to get this info, involving the game cache, than what is done here
"""
    get_transcluded_in.py
    MediaWiki API Demos
    Demo of `Transcludedin` module: Get a list of pages which transclude a given page
    MIT License
"""

from email import header
import json
from re import MULTILINE
import requests
import pprint
import regex as re
import os

pp = pprint.PrettyPrinter(indent=0)

headers = {
    'User-agent': 'Generating map labels',
    'From': 'aepoclol@gmail.com & @FawltyPlay#2730 on Discord'
    }

S = requests.Session()

URL = "https://oldschool.runescape.wiki/api.php"

PARAMS = {
    "action": "parse",
    "page": "Locations",
    "format": "json"
}
# Request the parsed data of the Locations page
R = S.get(url=URL, headers=headers, params=PARAMS)
DATA = R.json()
# Extract the links items
queryList = DATA['parse']['links']
# pp.pprint(queryList)

# Iterate across all the link item pages by parse requesting them
loc_list = []
for i in range(len(queryList)):
    PARAMS = {
        "action": "parse",
        "page": str(queryList[i]['*']),
        "format": "json" 
    }
    R = S.get(url=URL, headers=headers, params=PARAMS)
    DATA = R.json()
    DATA = json.dumps(DATA)
    DATA = json.loads(DATA)

    if 'error' in DATA:
        print(f"The page '{queryList[i]['*']}' doesn\'t exist.")
        continue

    loc = DATA['parse']['text']['*']
    locName = DATA['parse']['title']
    locNameURL = locName.replace(" ", "_")
    locPageId = DATA['parse']['pageid']

    # Regex pull the infobox
    regex_infoboxString = r"(?<=infobox-header)(.+?)(?=table)"
    # regex_infobox = r{regex_infoboxString}
    infobox_match = re.findall(regex_infoboxString, loc, re.DOTALL | re.MULTILINE)

    if len(infobox_match) == 0:
        continue

    # Check if the page describes a region
    regex_regionCheck = r"(region)"
    matches_region = re.findall(regex_regionCheck, infobox_match[0], re.MULTILINE)
    if len(matches_region) != 0:
        print(f"Location '{locName}' is a region. No center is given.")
        locInfo = {
            'locName': locName,
            'locPageId': locPageId,
            'locPageLink': f"https://oldschool.runescape.wiki/w/Special:Lookup?id={locPageId}&name={locNameURL}",
            'X': None,
            'Y': None,
            'Z': None,
            'type': 'region'
        }
        loc_list.append(locInfo)
        continue

    # Regex pull the map center location
    regex_lat = r"(?<=data-lat=\")(.+?)(?=\" )"
    matches_lat = re.findall(regex_lat, infobox_match[0], re.MULTILINE)
    regex_lon = r"(?<=data-lon=\")(.+?)(?=\" )"
    matches_lon = re.findall(regex_lon, infobox_match[0], re.MULTILINE)
    regex_plane = r"(?<=data-plane=\")(.+?)(?=\" )"
    matches_plane = re.findall(regex_plane, infobox_match[0], re.MULTILINE)


    if len(matches_lat) > 0:
        print(f"Location '{locName}' is centered at ({matches_lon[0]},{matches_lat[0]}, {matches_plane[0]})")
        locInfo = {
            'locName': locName,
            'locPageId': locPageId,
            'locPageLink': f"https://oldschool.runescape.wiki/w/Special:Lookup?id={locPageId}&name={locNameURL}",
            'X': matches_lon[0],
            'Y': matches_lat[0],
            'Z': matches_plane[0],
            'type': 'area'
        }
        loc_list.append(locInfo)
        continue
    else:
        print(f"Location '{locName}' is not a place that can be labelled")
        continue
    
# pp.pprint(loc_list)
# Dump the json into a file
location_json = json.dumps(loc_list, indent=4)
with open("./lists/osrs-location-list.json", "w+") as outfile:
    outfile.write(location_json)