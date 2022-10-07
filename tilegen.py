import time
start = time.time()
print("start")

import os
vipsbin = r'X:\conda\Lib\vips-dev-8.13\bin'
os.environ['PATH'] = vipsbin + ';' + os.environ['PATH']

# Requires an environment
# Recommend conda, but you have to download the library yourself, `conda install` did not work ATOW
# Slows down a lot when doing more than a single layer at a time, recommend restarting env
# Generating zooms 1-11 will produce 147k+ files, so do it somewhere you don't want to move it from
import pyvips
from PIL import Image, ImageDraw

imageDefaultZoom = 8
# Change this value
imageDesiredZoom = 1

# Adjust to desired location
endPath = f"./own_dzsave/{imageDesiredZoom}"
print(2**(imageDesiredZoom-imageDefaultZoom))
image = pyvips.Image.new_from_file('full_image_0.png')

# Recommend using this for zoom levels smaller than 8
image = image.resize(2**(imageDesiredZoom-imageDefaultZoom), kernel='lanczos3')

# Recommend using this for zoom levels larger than 8
# image = image.resize(2**(imageDesiredZoom-imageDefaultZoom), kernel='nearest')

# Magic
image.dzsave(endPath, tile_size=256, depth='one', overlap=0, layout='google', region_shrink='mode',
             suffix='.png[Q=100]', background=0, skip_blanks=0)


end = time.time()
print("done")
print("runetime: " + str((end-start)))


# # gdal2tiles code, for posterity
# # EXTREMELY SLOW
# import gdal2tiles
# import gdal


# if __name__ == '__main__': 

#     source_path = "full_image_0.png"
#     print(gdal.Info(source_path))
#     destination_path = "./own/"
#     def create_tiles(source_path, destination_path):
        
#         """
        
#         Method to generate tiles at different zoom levels using gdal2tiles library.
#         Args:source_path : path for the source file which needs to be tiled
#         destination_path : path for the output directory where the tiles will be generated

#         """    
#         options = {'zoom': [5, 6],
#             'nb_processes': 8,
#             'tile_size': 256,
#             # 's_srs':'EPSG:4326',
#             'verbose': True,
#             'profile': 'raster',
#             'kml': False,
#             'resume': True,
#             'webviewer': 'none'
#         }
#         gdal2tiles.generate_tiles(source_path, destination_path,**options)

#     create_tiles(source_path, destination_path)