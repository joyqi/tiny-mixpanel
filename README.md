# tiny-mixpanel

## What's this?

It's a minium mixpanel library written in TypeScript.

**Why not [mixpanel-browser](https://www.npmjs.com/package/mixpanel-browser)?**

Of course, you can use this official library. But it will make over 20kb extra sizes to a bundled js file. Moreover, considering the tracking system is widely used on every page, it will significantly increase the cost of your traffic.

So I rewrite the official embedding code by typescript. Then, instead of packaging it, it will load the whole library from the official CDN.

## Install

```bash
npm i -S tiny-mixpanel
```

For TypeScript you should also

```bash
npm i -D @types/mixpanel
```

## Usage

JavaScript

```javascript
const { loadMixpanel } = require('tiny-mixpanel');

loadMixpanel();

mixpanel.init('xxxx-xxxxxxxxxxxxxxx');
mixpanel.track('event name');
```

TypeScript

```typescript
import { loadMixpanel } from 'tiny-mixpanel';

loadMixpanel();

mixpanel.init('xxxx-xxxxxxxxxxxxxxx');
mixpanel.track('event name');
```
