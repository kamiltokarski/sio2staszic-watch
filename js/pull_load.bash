#! /bin/bash
#
# pull_json.bash created 2018-12-20
# Kamil Tokarski


watch -n 1 "wget http://sio2.staszic.waw.pl/workers/load.json -O load_new.json && mv load_new.json load.json"

