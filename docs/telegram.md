# Telegram bot

[← Back to contents](README.md)

The application can talk to a Telegram group through a bot. The bot token and the group identifier are set at installation with the `OPTA_TELEGRAM_BOT` and `OPTA_TELEGRAM_CHAT` environment variables (see the [main README](../README.md)).

## Notifications

The bot posts a message in the group when:

- the application starts;
- a device connects or disconnects;
- a [program](programs.md) switches the heating of an equipment on or off.

## Commands

Only users whose Telegram name is set in the [Users](users.md) page can command the bot. Messages are currently in French.

Send `/bot` to the group: the bot answers with buttons to choose a plant, a line and an equipment, then offers the available actions:

- switch the heating on or off;
- suspend or resume the program of the line;
- reset the partial hour meter or cycle counter.
