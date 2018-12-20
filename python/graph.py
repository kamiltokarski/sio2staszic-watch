#! /usr/bin/env python3
# -*- coding: utf-8 -*-
import datetime
from time import sleep

import requests

import numpy as np
from matplotlib.animation import FuncAnimation
import matplotlib.pyplot as plot

def get_data():
    response = requests.get('https://sio2.staszic.waw.pl/workers/load.json')
    json_data = response.json()
    load = json_data['load']
    capacity = json_data['capacity']
    timestamp = str(datetime.datetime.now().time())[:8]
    return load, timestamp, capacity

load, timestamp, cap  = get_data()

x = [timestamp]
y = [load]
z = [cap]

fig = plot.figure()
ax = fig.add_subplot(1, 1, 1)
ax.set_ylim([0, 7])

def update(i):
    global x
    global y
    global z
    load, timestamp, cap = get_data()
    print('LOAD: %s AT TIME %s' % (load, timestamp))
    y.append(load)
    x.append(timestamp)
    z.append(cap)

    if(len(x) > 12):
        x = x[len(x) - 12:]
        y = y[len(y) - 12:]
        z = z[len(z) - 12:]

    ax.clear()
    ax.set_ylim([0, 6])
    ax.plot(x, y, color='blue')
    ax.plot(x, z, color='darkblue')
    ax.fill_between(x, 0, z, facecolor='darkblue', alpha=0.3)
    ax.fill_between(x, 0, y, facecolor='blue', alpha=0.9)

a = FuncAnimation(fig, update, blit=False, interval=800)
plot.show()

