#! /bin/bash
#
# pull_json.bash created 2018-12-20
# Kamil Tokarski


watch -n 1 "wget http://sio2.staszic.waw.pl/workers/queue.json -O queue_new.json && mv queue_new.json queue.json"

