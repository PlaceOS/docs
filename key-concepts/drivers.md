# Drivers

_Drivers_ are an open plugin system. They provide the ability to either:

* **communicate** with external systems, hardware, or other software platforms \(_device_ and _service_ drivers\), or
* **coordinate** actions across modules and build complex behaviours \(_logic_ drivers\).

![Drivers either communicate or coordinate.](../.gitbook/assets/concepts-drivers.svg)

All drivers, regardless of type, must be instantiated as [modules](modules.md) before they can be used.



