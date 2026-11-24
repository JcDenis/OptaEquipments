# List

[← Back to contents](README.md)

The **List** page gives tables of what is declared for the selected plant. It is open to Technician, Technician manager and Administrator levels.

Select a plant, then a list. Every table has a search field and shows its number of records.

![Equipments list](images/list-equipments.png)

| List | Content |
|---|---|
| Lines | Lines of the plant |
| Equipments | Equipments with their running state, line and number of components |
| Equipment families | Families with their number of equipments and counters (shared by all plants) |
| Linx inkjet printers | Linx printers of the plant, see [linx.md](linx.md) |
| Counters | Maintenance counters |
| Devices | Devices with their connection state, model and the equipments they serve |
| Components | Every component with its device, terminal, contact type and current value |
| Holidays | Holidays of the plant |

![Components list](images/list-components.png)

## Actions

- The **Delete** button of a row removes the item, with the same rules as in the [Tree](tree.md#deleting) page.
- In the **Counters** list, the **Hide** button removes a counter from one equipment only, for equipments of a family that differ from the others (Technician manager and Administrator). A hidden counter is frozen and no longer appears in the Counters and Detail pages; it stays in this list, with a **Show** button. When shown again it resumes from the value it had when hidden.
- In the **Counters** list, the **GMAO** button links a counter of one equipment to a counter of the maintenance management software, by its GMAO ID (Technician manager and Administrator). See [GMAO link](gmao.md).
- In the **Devices** list, click a row to see the information of the device (model, address, last contact…).
