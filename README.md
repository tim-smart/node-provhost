# node-provhost

A node library for generating and parsing tags from a hostname string.


## Why?

Some VPS hosts have no way of tagging instances with metadata, so we need a way
of easily determining what server does what using a common field - the hostname.


## Syntax

```
namespace--groups-that3-are-seperated--someid
```

Numbers suffixed to a group name determine how many instances of that group are
expected to run on this host. I.e. `www4` would set the `count` of the `www`
group to `4`.

## Usage

```js
var provhost = require('provhost');

console.log(provhost.stringify({
	namespace: 'myapp',
	groups: [
		'mysql',
		{ name: 'www', count: 4 },
		'redis',
		'mongo2' // Same as `{ name: 'mongo', count: 2 }`
	]
}));

console.log(provhost.parse(
	// Result of the above console.log
	'myapp--mongo2-mysql-redis-www4--4cb93e77'
));

// Returns:
{
    "namespace": "myapp",
    "groups": [
        {
            "name": "mongo",
            "count": 2
        },
        {
            "name": "mysql",
            "count": 1
        },
        {
            "name": "redis",
            "count": 1
        },
        {
            "name": "www",
            "count": 4
        }
    ],
    "id": "4cb93e77"
};
```
