# Settings

_Settings_ are the configuration information that define how an Engine deployment should behave. They are ultimately ingested and used by [modules](modules.md), but can be defined against [zones](zones.md), [systems](systems.md), [drivers](drivers.md) or [modules](modules.md) and compose to create an overall system configuration that can be managed at scale.

Settings are expressed as [JSON data](https://en.wikipedia.org/wiki/JSON#JSON_sample), or simply–key/value pairs:

{% code title="" %}
```javascript
{
  "key": "value",
  "foo": [1, 2, 3],
  "bar": true 
  "baz": { 
    "qux": 1.234
  }
}
```
{% endcode %}

{% hint style="info" %}
JSON is a common, simple data-interchange format that is designed to be easy for humans to read and write, and for machines to parse and generate. If it is a new concept, you can [learn more here](https://learnxinyminutes.com/docs/json/).
{% endhint %}

The naming and expected values are defined within drivers and will vary based on the integrations in use within each deployment, however the overall structure will always be similar.

Examples of some common uses for settings are: available video inputs/outputs, source names, DSP block ID's, lighting control ID's, device auth information, desk / room auto-release timeouts etc.

### Settings lookup

To simplify large deployments, standardise systems and reduce management overhead, settings are designed to be defined at different layers which then combine to produce the final configuration.

Settings defined on a zone are inherited by all systems in that zone.

Similarly, settings defined on a driver are inherited by all modules created from it.

![Settings inheritance.](../.gitbook/assets/concepts-settings.svg)

When settings are inherited from a zone or driver they will be aggregated with any settings defined directly on a system or module. If an inherited setting has the same key as one that is defined specifically for that system/module, the latter will override the inherited attribute. This allows a general config to be applied at the highest 'shared' point of a system, with more specific configuration applied on a system or individual module basis.

