# Map

[← Back to contents](README.md)

The **Map** page is the home page after signing in. It shows the plan of the plant with its lines placed on it.

Users without plant first select a plant. The plan is shown only if an image was uploaded for this plant and at least one line was placed on it (see [Tree → Plant maps and Line locations](tree.md#plant-maps-and-line-locations)).

## Reading the map

Each line is drawn as a rectangle whose colour gives its heating state:

- green: all the equipments of the line are heating;
- red: no equipment of the line is heating;
- orange: only some equipments of the line are heating.

The rectangle also tells if the line is stopped, ready or in cycle. A legend under the map recalls these states.

## Counters summary

Under the map, a small table gives the number of maintenance counters of the plant, how many are in pre-alert (from 75% to less than 100% of their limit) and how many are in alert (100% and more). Counters hidden on an equipment are not counted. See [Counters](counters.md).

## Line dialog

Click a line to open its dialog. It lists the equipments of the line with their heating and maintenance icons (the wrench is green while every counter of the equipment is under 75%, orange from 75% and red from 100%), and gives the same commands as the [Programs](programs.md) page for this line: one button per team, and the Auto / Manual button.
