# thanos-snap

Use [Thanos](https://www.google.com/search?q=Thanos) snap to destory your DOM elements.

# Installation

```shell
npm install html2canvas ramda @wellwind/thanos-snap

or

yarn add html2canvas ramda @wellwind/thanos-snap
```

Then import the scripts.

```typescript
import { thanosSnap, thanosRewind } from '@wellwind/thanos-snap';
```

# Usage

```typescript
// destroy the element, and rewind it after 3s.
const element = document.querySelector('someElm');
thanosSnap(element).then(() => {
  setTimeout(() => {
    thanosRewind(element);
  }, 3000);
});
```

# Are you using Angular

There is also an Angular library called [@wellwind/ngx-thanos](https://github.com/wellwind/ngx-thanos/tree/master/libs/ngx-thanos). You can simple add a directive to your element, and enjoy the Thanos snap effect.
