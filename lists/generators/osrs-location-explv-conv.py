import json
import pprint
pp = pprint.PrettyPrinter(indent=4)

with open('lists\locations-explv.json') as origFile:
    locData = json.load(origFile)

# pp.pprint(locData['locations'])

locEntries = locData['locations']
print(locEntries)
locJSONdata = []

for item in range(len(locEntries)):
    locPosX = locEntries[item]['coords'][0]
    locPosY = locEntries[item]['coords'][1]
    locPosZ = locEntries[item]['coords'][2]
    locName = locEntries[item]['name']
    locType = locEntries[item]['size']

    locInfo = {
        'locName': locName,
        'locPageId': None,
        'locPageLink': None,
        'X': locPosX,
        'Y': locPosY,
        'Z': locPosZ,
        'type': locType
    }
    locJSONdata.append(locInfo)

locJSONdata = json.dumps(locJSONdata, indent=4)
with open("./lists/osrs-location-list.json", "w+") as outfile:
    outfile.write(locJSONdata)