# Counters

[← Back to contents](README.md)

The **Counters** page follows the maintenance counters of the selected plant.

![Counters page](images/counters.png)

A counter is a maintenance operation to do at a regular interval. Counters are defined per [family](tree.md#counters): every equipment of the family gets its own copy of the counter. There are two types:

- **Hours of operation**: the interval is a number of running hours, for example a lubrication every 500 hours. The counter is fed by the total hour meter of the equipment.
- **Days (calendar)**: the interval is a number of days, for example an inspection every 180 days. The counter starts when it is created (or when the equipment joins the family), then counts the days since its last reset. It does not need any component on the equipment.

| Column | Content |
|---|---|
| Equipment | Name of the equipment |
| Counter | Text of the counter |
| Maintenance | Green below 75 %, orange from 75 %, red at 100 % or more |
| Wear | Hours or days done as a percentage of the limit |
| Progress | Hours (h) or days done / limit |
| Reset button | Sets the counter back to zero once the maintenance is done |

The list is sorted with the most worn counters first, and can be filtered with the search field.

- Click a row to open the [Detail](detail.md) page of the equipment (Technician and above).
- The **Reset** button asks for a confirmation. It is available to Technician, Technician manager and Administrator levels.

An equipment appears here only if it belongs to a family having counters. For a counter in hours of operation, it also needs a *total hour meter* component.
