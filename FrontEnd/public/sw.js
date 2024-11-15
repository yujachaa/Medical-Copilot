if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + '.js', c).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, n) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[i]) return;
    let r = {};
    const t = (e) => a(e, i),
      f = { module: { uri: i }, exports: r, require: t };
    s[i] = Promise.all(c.map((e) => f[e] || t(e))).then((e) => (n(...e), r));
  };
}
define(['./workbox-f1770938'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/chunks/0e762574-c1fe9c890b91a0f5.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        { url: '/_next/static/chunks/2565.aa21fd887c78d25a.js', revision: 'aa21fd887c78d25a' },
        { url: '/_next/static/chunks/3145-910ddc61a411926e.js', revision: 'fa7M5kr1nm4rKbrhz67cz' },
        { url: '/_next/static/chunks/420.da9d14030bc046d9.js', revision: 'da9d14030bc046d9' },
        { url: '/_next/static/chunks/4258-4560d988055ce411.js', revision: 'fa7M5kr1nm4rKbrhz67cz' },
        { url: '/_next/static/chunks/5234-94183ae59f3fdde8.js', revision: 'fa7M5kr1nm4rKbrhz67cz' },
        { url: '/_next/static/chunks/5331-e1f9722e8d518d49.js', revision: 'fa7M5kr1nm4rKbrhz67cz' },
        {
          url: '/_next/static/chunks/53c13509-5e5cd9f936090cac.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        { url: '/_next/static/chunks/5960-4bc2bceab1dfef32.js', revision: 'fa7M5kr1nm4rKbrhz67cz' },
        {
          url: '/_next/static/chunks/5e22fd23-76c78bdfd5d28a2d.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        { url: '/_next/static/chunks/6190.03fe3f08c405c868.js', revision: '03fe3f08c405c868' },
        { url: '/_next/static/chunks/6997-007c2d67f5fbc586.js', revision: 'fa7M5kr1nm4rKbrhz67cz' },
        { url: '/_next/static/chunks/7334.c63787fb568c204d.js', revision: 'c63787fb568c204d' },
        { url: '/_next/static/chunks/7369.b3dd1629b1916db2.js', revision: 'b3dd1629b1916db2' },
        { url: '/_next/static/chunks/755-9a9e9e38a67d847b.js', revision: 'fa7M5kr1nm4rKbrhz67cz' },
        {
          url: '/_next/static/chunks/795d4814-2efd23f1654bb890.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        { url: '/_next/static/chunks/8048.5c838800f523625a.js', revision: '5c838800f523625a' },
        { url: '/_next/static/chunks/8575-9b40f4214d2c09aa.js', revision: 'fa7M5kr1nm4rKbrhz67cz' },
        {
          url: '/_next/static/chunks/app/_not-found/page-7d963b77c11d271e.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/layout-9c7d7df81e72a7a3.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/login/page-7c652e8c04672c87.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/medical/chat/%5Bid%5D/page-5d9c030d530bdfad.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/medical/layout-9889903490b2e06d.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/medical/main/page-11261d165ce53fe0.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/medical/mychat/page-8d409f4f0ff1bf8a.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/medical/mypage/page-ab190eddf6703c7c.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/medical/page-87f32810dbd7b505.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/medical/temp/%5Bid%5D/page-34db530f0f684b39.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/mypage/layout-144b3eab583099ca.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/mypage/page-f02767ad1bf76b5f.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/page-5b74a6f277c15f31.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/pdf/%5BreportId%5D/page-e378ee88d13414ac.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/app/regist/page-291977358287b651.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/c916193b-11af28042292efbf.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/f7333993-f6dcd4e5087e9753.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/f8025e75-fdf3fb692e93064b.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/f97e080b-5c14fd19c8ea5810.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/fd9d1056-6a33a4e5b84ffa15.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/framework-a63c59c368572696.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        { url: '/_next/static/chunks/main-1214750eecf77c91.js', revision: 'fa7M5kr1nm4rKbrhz67cz' },
        {
          url: '/_next/static/chunks/main-app-09346f13b4c1b5e1.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/pages/_app-78ddf957b9a9b996.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/pages/_error-7ce03bcf1df914ce.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-d97694dc8eaf2ef2.js',
          revision: 'fa7M5kr1nm4rKbrhz67cz',
        },
        { url: '/_next/static/css/1d5341d50c21dcec.css', revision: '1d5341d50c21dcec' },
        { url: '/_next/static/css/3315a5dca697753d.css', revision: '3315a5dca697753d' },
        { url: '/_next/static/css/3f264f0dc2eeeb4c.css', revision: '3f264f0dc2eeeb4c' },
        { url: '/_next/static/css/48521f74d5f0d6a9.css', revision: '48521f74d5f0d6a9' },
        { url: '/_next/static/css/73c0271a65f1636e.css', revision: '73c0271a65f1636e' },
        { url: '/_next/static/css/801a93637a101b0a.css', revision: '801a93637a101b0a' },
        { url: '/_next/static/css/8799cfa5f11821f0.css', revision: '8799cfa5f11821f0' },
        { url: '/_next/static/css/87b1e6f08f08f594.css', revision: '87b1e6f08f08f594' },
        { url: '/_next/static/css/9205b9b579e09b2a.css', revision: '9205b9b579e09b2a' },
        { url: '/_next/static/css/a03d752b7bf6d113.css', revision: 'a03d752b7bf6d113' },
        { url: '/_next/static/css/c9864a0fb8a880e9.css', revision: 'c9864a0fb8a880e9' },
        { url: '/_next/static/css/e858ce21d32f0bf9.css', revision: 'e858ce21d32f0bf9' },
        { url: '/_next/static/css/eac0e6b7efbd7876.css', revision: 'eac0e6b7efbd7876' },
        {
          url: '/_next/static/fa7M5kr1nm4rKbrhz67cz/_buildManifest.js',
          revision: '0ea7e7088aabf697ba3d8aa8c7b54a89',
        },
        {
          url: '/_next/static/fa7M5kr1nm4rKbrhz67cz/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/media/1dc118ae0b0e1412-s.p.ttf',
          revision: '67dd2a3d593c24ed0b69c989054a333d',
        },
        {
          url: '/_next/static/media/2f54ee164d134194-s.p.ttf',
          revision: 'c6c38df66d68dddca0af0590a4a6fd93',
        },
        {
          url: '/_next/static/media/Logo_Landing.902199aa.png',
          revision: 'a00e41ae041f6db68c920f5f7c127fd3',
        },
        {
          url: '/_next/static/media/chatbotImg.24e9d708.png',
          revision: 'dea2237215c6ae5a16eb3befc36f0a2d',
        },
        {
          url: '/_next/static/media/f523b34eb605ae5e-s.p.ttf',
          revision: '8b7ebc2fdf4ac14ce6d3558b126aa171',
        },
        {
          url: '/_next/static/media/userImg.748163a6.png',
          revision: 'e652b9d4ed71a8c1ca2ceafaeaac5bc1',
        },
        {
          url: '/_next/static/media/xray-default.43fe2e00.webp',
          revision: '06cf066ca525be0a9dbb888715c3c98e',
        },
        { url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
        { url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
        { url: '/icon512_maskable.png', revision: 'faf93fdf75fe1d8938e7b13452a013c3' },
        { url: '/icon512_rounded.png', revision: 'daf404c69ae3f407708a40bb03ced6ad' },
        { url: '/manifest.json', revision: '08563cc56ca7636fe1534aaaa200e1bb' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/vercel.svg', revision: 'c0af2f507b369b085b35ef4bbe3bcf1e' },
        { url: '/window.svg', revision: 'a2760511c65806022ad20adf74370ff3' },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && 'opaqueredirect' === e.type
                ? new Response(e.body, { status: 200, statusText: 'OK', headers: e.headers })
                : e,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: 'next-static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: s } }) =>
        !(!e || s.startsWith('/api/auth/callback') || !s.startsWith('/api/')),
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        '1' === e.headers.get('RSC') &&
        '1' === e.headers.get('Next-Router-Prefetch') &&
        a &&
        !s.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages-rsc-prefetch',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        '1' === e.headers.get('RSC') && a && !s.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages-rsc',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: s }) => s && !e.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET',
    );
});
