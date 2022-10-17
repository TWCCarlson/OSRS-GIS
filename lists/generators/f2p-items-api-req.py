#!/usr/bin/python3

"""
    get_transcluded_in.py
    MediaWiki API Demos
    Demo of `Transcludedin` module: Get a list of pages which transclude a given page
    MIT License
"""

from email import header
import json
import requests
import pprint
import regex as re

pp = pprint.PrettyPrinter(indent=0)

headers = {
    'User-agent': 'Mapping F2P Item Spawns',
    'From': 'aepoclol@gmail.com & @FawltyPlay#2730 on Discord'
    }

S = requests.Session()

URL = "https://oldschool.runescape.wiki/api.php"

PARAMS = {
    "action": "query",
    "titles": "Template:ItemSpawnTableHead",
    "prop": "transcludedin",
    "tinamespace": 0,
    "tilimit": "500",
    "format": "json"
}

R = S.get(url=URL, headers=headers, params=PARAMS)
DATA = R.json()

# pp.pprint(DATA)
DATA = json.dumps(DATA)
DATA = json.loads(DATA)
# print(DATA['query']['pages']['276731']['transcludedin'])
DATA_ITEMINFO = DATA['query']['pages']['276731']['transcludedin']
# print(len(DATA['query']['pages']['276731']['transcludedin']))
# for n in range(len(DATA_ITEMINFO)):

item_list = []

for n in range(len(DATA['query']['pages']['276731']['transcludedin'])-1):
    # print(DATA_ITEMINFO[n])
    itemName = DATA_ITEMINFO[n]['title']
    itemPageId = DATA_ITEMINFO[n]['pageid']

    PARAMS = {
        "action": "parse",
        "prop": "text",
        "pageid": itemPageId,
        "format": "json"
    }

    Response = S.get(url=URL, headers=headers, params=PARAMS)
    DATA = Response.json()
    DATA = json.dumps(DATA)
    DATA = json.loads(DATA)
    DATA_TEXT = DATA['parse']['text']
    # print(DATA['parse']['text']['*'])

    # print(itemPageId)
    # print(itemName)

    if itemPageId==276731:
        print("SKIP TEMPLATE PAGE")
        continue
    elif itemPageId ==276732:
        print("SKIP TEMPLATE PAGE")
        continue
    else:
        # Trim down to the just the spawns table
        regex_table = r"(?<=<th>Location\\n</th>)(.+?)(?=</tbody></table>)"
        table_match = re.findall(regex_table, repr(DATA['parse']['text']['*']), re.MULTILINE)

        # Parse the data to identify if it is a members item or not
        regex_row = r"(?<=title=)(.+?)(?=Maplink)"
        row_match = re.findall(regex_row, table_match[0], re.MULTILINE)

        # pp.pprint(table_match[0])
        

        for row in row_match:
            # print(itemPageId)
            # print(itemName)
            # pp.pprint(row)
            # Check the the item spawns in F2P
            regex_validF2PItem = r"(?<=title=\")(Free-to-play)(?=\")"
            valid = re.findall(regex_validF2PItem, row)

            if len(valid) > 0:
                # Parse the data to locate the spawn location
                regex_lat = r"(?<=data-lat=\")(.+?)(?=\" )"
                matches_lat = re.findall(regex_lat, row, re.MULTILINE)
                regex_lon = r"(?<=data-lon=\")(.+?)(?=\" )"
                matches_lon = re.findall(regex_lon, row, re.MULTILINE)
                regex_plane = r"(?<=data-plane=\")(.+?)(?=\" )"
                matches_plane = re.findall(regex_plane, row, re.MULTILINE)

                for i in range(len(valid)):
                    print(f"Item '{itemName}' spawns at ({matches_lon[i]},{matches_lat[i]},{matches_plane[i]})")
                    itemInfo = {
                        'itemName': itemName,
                        'itemPageId': itemPageId,
                        'itemPageLink': f"https://oldschool.runescape.wiki/w/Special:Lookup?type=item&name={itemName}",
                        'X': matches_lon[i],
                        'Y': matches_lat[i],
                        'Z': matches_plane[i],
                    }
                    item_list.append(itemInfo)

# print("===")
# pp.pprint(item_list)

item_json = json.dumps(item_list, indent=4)
with open("./lists/f2p-item-list.json", "w+") as outfile:
    outfile.write(item_json)