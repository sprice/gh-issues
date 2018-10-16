# GitHub Issues Viewer

A pleasantly designed viewer for GitHub Issues. Simply paste the URL of a GitHub repo and browse the issues.

## Notes

This viewer uses the GitHub Issues API. It is rate limited so the viewer caches results for one hour.

## Installation

`node` and `npm` are requirements. Head on over to [nodejs.org](https://nodejs.org/) to find the right download for your system.

```
git clone https://github.com/sprice/gh-issues
cd gh-issues
npm i
```

### For Development

```
cd gh-issues
npm run dev
```

### For Production

#### Build for Production

```
cd gh-issues
npm run build
```

#### Run in Production

```
cd gh-issues
npm run start
```

## Run Tests

```
cd gh-issues
npm test
```

## LICENSE

Copyright Shawn Price 2018 and released under the Apache 2.0 License. See `LICENSE` file.

Some boilerplate code is copyright Brian Holt 2018 (Apache 2.0)
