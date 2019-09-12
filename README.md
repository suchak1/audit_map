# Audit Map
[![Build Status](https://travis-ci.org/suchak1/audit_map.png?branch=master)](https://travis-ci.org/suchak1/audit_map)
[![Linux](https://img.shields.io/badge/os-Linux-1f425f.svg)](https://ubuntu.com/download/desktop)
[![node](https://img.shields.io/badge/node-v10.16.3-red.svg)](https://ubuntu.com/download/desktop)
[![npm](https://img.shields.io/badge/npm-6.9.0-blue.svg)](https://ubuntu.com/download/desktop)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)
[![version](https://img.shields.io/github/package-json/v/suchak1/audit_map)](package.json)

#### an entry for the Virtru Privacy Engineering Challenge
***

Using geolocation of IP addresses from Audit data, we can pinpoint visually where bad actors access and send data. Thus, potentially halting the spread of sensitive information by simply revoking access.

## Getting Started

### Prerequisites

Obtain a free api key from [*mapbox*](https://www.mapbox.com/)
- This will enable mapping services.


Obtain a [free api key](https://ipstack.com/product) from [*ipstack*](https://ipstack.com).
- This will enable ip address to a geographic coordinate conversion (latitude / longitude).

Obtain a free api key from [*virtru*](https://www.virtru.com/)
- This will enable encryption services and access to audit data.

Paste your api keys in the [`.env`](.env) file as such:

```
REACT_APP_MAPBOX=...
REACT_APP_IPSTACK=...
REACT_APP_VIRTRU=...
```

### Installation
**Linux**

To install the necessary packages, simply run:
```
npm ci
```

## Deployment

To use Audit Map, run:

```
npm start
```


## Result

![](pics/half3.png)

## Files

- [```.env```](.env) - credentials file

- [```.travis.yml```](.travis.yml) - build pipeline


## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md)
 file for details.

***

[![Made with Javascript](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://nodejs.org/en/)
