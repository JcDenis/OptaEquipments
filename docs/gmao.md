# GMAO link

[← Back to contents](README.md)

The counters of the dashboard can be sent to the maintenance management software (**GMAO**, SPIGMAO), which keeps the preventive maintenance schedule. Once a day, the value of every linked counter is sent; a counter reset is sent at once, with its date. In the other direction, when a preventive work order on a counter is finished in the GMAO, the dashboard resets its counter by itself.

## Setup in the GMAO

In SPIGMAO (see its `docs/15-api.md`):

1. create a technical user, for example `optaequipments`, with the role **Intégration compteurs (API)** on the plants concerned;
2. on this user, create a key with « Autoriser les modifications » and no expiry: it is shown only once;
3. on each equipment page of SPIGMAO, the **GMAO ID** of each counter is shown with a Copy button.

## Setup in the dashboard

**System › GMAO** (administrator):

| Field | Use |
|---|---|
| GMAO address | Address of SPIGMAO, for example `http://10.40.0.139:8080` |
| API key | Key created in SPIGMAO. It is never shown back: leave the field empty to keep the current key |
| Daily send hour | Hour of the daily send (06:00 by default) |
| Send counters to the GMAO | Enables the link |
| Accept counter resets from the GMAO | Resets asked by the GMAO are applied (checked by default), see below |

- **Test connection** checks the address and the key, and tells whether the key allows sending.
- **Send now** sends the current value of every linked counter at once, then fetches the resets asked by the GMAO.
- The table shows the state of the link: linked counters, last successful send, last try and its result, events waiting, the last check of the resets asked by the GMAO and the last resets applied, and the last refusals of the GMAO.

Nothing is sent when **Enable commands to devices** is unchecked in [System › Application](system.md#application) (or with `OPTA_COMMANDS=false`): a second instance beside the production one never writes to the production GMAO.

## Linking a counter

In the [List](list.md) page, **Counters** list, the **GMAO** column (Technician manager and Administrator):

- **Link GMAO**: enter the GMAO ID of the counter. The dashboard asks the GMAO to confirm it and shows the equipment and the counter found there. An unknown ID is refused.
- **GMAO 12**: the counter is linked to GMAO counter 12. Click to change the ID, or empty it to remove the link.

Both hours counters and calendar counters can be linked; link a calendar counter to a GMAO counter in days.

## What is sent

- **Every day** at the chosen hour: the value of each linked counter (hours since the last reset, or days for a calendar counter). A hidden counter is not sent.
- **On reset** of a linked counter (Counters or List page): the reset, dated, with the value just before. The GMAO keeps an ever-growing counter, so its maintenance schedule stays right.

## Resets asked by the GMAO

When a technician finishes, in the GMAO, a preventive work order whose maintenance plan follows a counter, the GMAO asks for a reset of this counter. It can also be asked by hand in the GMAO (equipment page, or Préventif › Compteurs).

The GMAO never connects to the dashboard and does not need its address: **the dashboard fetches the requests** every 15 minutes (and on **Send now**), for the counters it has linked only.

1. The linked counter is reset here, as with the reset button.
2. The dated reset is sent to the GMAO with the request number: this is the acknowledgement, the request is marked applied in the GMAO.

- A request is applied only once, even if the acknowledgement has to wait (GMAO unreachable).
- A counter already at zero is not reset again; the acknowledgement is sent anyway.
- A hidden counter, or a GMAO ID linked to no counter here, is not reset: the GMAO shows the request as still waiting after 24 hours.
- Uncheck **Accept counter resets from the GMAO** to apply nothing. Like sending, nothing is fetched when commands are disabled.

## Reliability

- Events wait in a queue kept on the server (it survives a restart). An event leaves the queue only when the GMAO confirms it.
- If the GMAO cannot be reached, the queue is sent again every hour, in date order.
- An event queued while a send is running is sent in the same run.
- Sending the same event twice is harmless: the GMAO answers « already received ».
- An event refused for good by the GMAO (for example an unknown counter) leaves the queue and is listed in the refusals of System › GMAO.
- The queue keeps at most 5 000 events; the oldest ones are lost beyond.
