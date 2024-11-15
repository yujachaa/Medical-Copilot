if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
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
  self.define = (i, c) => {
    const n = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[n]) return;
    let t = {};
    const d = (e) => a(e, n),
      r = { module: { uri: n }, exports: t, require: d };
    s[n] = Promise.all(i.map((e) => r[e] || d(e))).then((e) => (c(...e), t));
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
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        { url: '/_next/static/chunks/2053.5f28a0d933c366bd.js', revision: '5f28a0d933c366bd' },
        { url: '/_next/static/chunks/2565.6bbae22eda844480.js', revision: '6bbae22eda844480' },
        { url: '/_next/static/chunks/301-4568ddebfb12b307.js', revision: 'iJO8LH6sTl7lWXYZ3aYdO' },
        { url: '/_next/static/chunks/3086-92afb8c443458067.js', revision: 'iJO8LH6sTl7lWXYZ3aYdO' },
        { url: '/_next/static/chunks/3145-3ce002c9d7b9ccbd.js', revision: 'iJO8LH6sTl7lWXYZ3aYdO' },
        { url: '/_next/static/chunks/3183.a34153ae3d541aa9.js', revision: 'a34153ae3d541aa9' },
        { url: '/_next/static/chunks/420.7a86bdfa6e7cb7a5.js', revision: '7a86bdfa6e7cb7a5' },
        { url: '/_next/static/chunks/4648.f247784bd0abd0c6.js', revision: 'f247784bd0abd0c6' },
        { url: '/_next/static/chunks/4694-4ed75b07912ca595.js', revision: 'iJO8LH6sTl7lWXYZ3aYdO' },
        { url: '/_next/static/chunks/4747-cbca7a5f3ffa30df.js', revision: 'iJO8LH6sTl7lWXYZ3aYdO' },
        { url: '/_next/static/chunks/5183-c1449cdfe12514df.js', revision: 'iJO8LH6sTl7lWXYZ3aYdO' },
        {
          url: '/_next/static/chunks/53c13509-5e5cd9f936090cac.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        { url: '/_next/static/chunks/5549-8150cf143f4c0990.js', revision: 'iJO8LH6sTl7lWXYZ3aYdO' },
        {
          url: '/_next/static/chunks/5e22fd23-76c78bdfd5d28a2d.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        { url: '/_next/static/chunks/6997-fe3e1a7445004048.js', revision: 'iJO8LH6sTl7lWXYZ3aYdO' },
        { url: '/_next/static/chunks/7334.e204d30126797f53.js', revision: 'e204d30126797f53' },
        {
          url: '/_next/static/chunks/795d4814-2efd23f1654bb890.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        { url: '/_next/static/chunks/8048.785264ee7233a0ea.js', revision: '785264ee7233a0ea' },
        { url: '/_next/static/chunks/8575-8304da576d0e5c67.js', revision: 'iJO8LH6sTl7lWXYZ3aYdO' },
        { url: '/_next/static/chunks/9859-7bf103edbfd01eef.js', revision: 'iJO8LH6sTl7lWXYZ3aYdO' },
        {
          url: '/_next/static/chunks/app/_not-found/page-7593a510aed5617b.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/layout-d458c1d80e4a1136.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/login/page-e008a86582c18f15.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/medical/chat/%5Bid%5D/page-2c497c1658d0f1b4.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/medical/layout-d08e37a69376210a.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/medical/main/page-1f0c3e89a7231bc6.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/medical/mychat/page-d5c997b1df76b330.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/medical/mypage/page-bb86c1d14b2ad2f3.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/medical/page-87f32810dbd7b505.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/medical/temp/%5Bid%5D/page-26cd6a8e201adc75.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/mypage/layout-a1ad8c8256d01430.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/mypage/page-d2351041f9706474.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/page-6c57f892956a8868.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/pdf/%5BreportId%5D/page-c47daab8e561bad1.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/app/regist/page-eeda321da6dcac2b.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/c916193b-11af28042292efbf.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/f7333993-f6dcd4e5087e9753.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/f8025e75-fdf3fb692e93064b.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/f97e080b-5c14fd19c8ea5810.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/fd9d1056-d1db0aefd85d83c0.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/framework-a63c59c368572696.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        { url: '/_next/static/chunks/main-1214750eecf77c91.js', revision: 'iJO8LH6sTl7lWXYZ3aYdO' },
        {
          url: '/_next/static/chunks/main-app-d1f121947b68a9df.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/pages/_app-78ddf957b9a9b996.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/pages/_error-7ce03bcf1df914ce.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-cccec07794740d85.js',
          revision: 'iJO8LH6sTl7lWXYZ3aYdO',
        },
        { url: '/_next/static/css/0887646f579c309b.css', revision: '0887646f579c309b' },
        { url: '/_next/static/css/1d5341d50c21dcec.css', revision: '1d5341d50c21dcec' },
        { url: '/_next/static/css/3315a5dca697753d.css', revision: '3315a5dca697753d' },
        { url: '/_next/static/css/3f264f0dc2eeeb4c.css', revision: '3f264f0dc2eeeb4c' },
        { url: '/_next/static/css/48521f74d5f0d6a9.css', revision: '48521f74d5f0d6a9' },
        { url: '/_next/static/css/7f9149e2edff3dff.css', revision: '7f9149e2edff3dff' },
        { url: '/_next/static/css/801a93637a101b0a.css', revision: '801a93637a101b0a' },
        { url: '/_next/static/css/8799cfa5f11821f0.css', revision: '8799cfa5f11821f0' },
        { url: '/_next/static/css/87b1e6f08f08f594.css', revision: '87b1e6f08f08f594' },
        { url: '/_next/static/css/9205b9b579e09b2a.css', revision: '9205b9b579e09b2a' },
        { url: '/_next/static/css/9350d1d0928032d5.css', revision: '9350d1d0928032d5' },
        { url: '/_next/static/css/a03d752b7bf6d113.css', revision: 'a03d752b7bf6d113' },
        { url: '/_next/static/css/c9641597f6810f67.css', revision: 'c9641597f6810f67' },
        { url: '/_next/static/css/c9864a0fb8a880e9.css', revision: 'c9864a0fb8a880e9' },
        { url: '/_next/static/css/e858ce21d32f0bf9.css', revision: 'e858ce21d32f0bf9' },
        { url: '/_next/static/css/f3364fc9e2d47bb0.css', revision: 'f3364fc9e2d47bb0' },
        {
          url: '/_next/static/iJO8LH6sTl7lWXYZ3aYdO/_buildManifest.js',
          revision: '0ea7e7088aabf697ba3d8aa8c7b54a89',
        },
        {
          url: '/_next/static/iJO8LH6sTl7lWXYZ3aYdO/_ssgManifest.js',
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
