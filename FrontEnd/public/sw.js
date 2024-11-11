if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
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
  self.define = (n, i) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[t]) return;
    let c = {};
    const r = (e) => a(e, t),
      u = { module: { uri: t }, exports: c, require: r };
    s[t] = Promise.all(n.map((e) => u[e] || r(e))).then((e) => (i(...e), c));
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
          url: '/_next/static/chunks/0e762574-f114a5ed941fcd05.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        { url: '/_next/static/chunks/145-41fe1e1222b92469.js', revision: 'i6EhuQXpwTnd4fKv6OrAa' },
        { url: '/_next/static/chunks/301-b36e9de37baa2a69.js', revision: 'i6EhuQXpwTnd4fKv6OrAa' },
        {
          url: '/_next/static/chunks/53c13509-76f7741c23a3f980.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        { url: '/_next/static/chunks/575-e24b7da171d7652d.js', revision: 'i6EhuQXpwTnd4fKv6OrAa' },
        {
          url: '/_next/static/chunks/5e22fd23-d65b0843e5e7887a.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        { url: '/_next/static/chunks/77-07665766dff8bebf.js', revision: 'i6EhuQXpwTnd4fKv6OrAa' },
        {
          url: '/_next/static/chunks/795d4814-e688dbb3e1c25eae.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        { url: '/_next/static/chunks/80-12efa616566d57ff.js', revision: 'i6EhuQXpwTnd4fKv6OrAa' },
        { url: '/_next/static/chunks/843.8975cdf1c6af9f64.js', revision: '8975cdf1c6af9f64' },
        {
          url: '/_next/static/chunks/8e1d74a4-456347810f5965f7.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        { url: '/_next/static/chunks/997-1ca3c805abec9d7c.js', revision: 'i6EhuQXpwTnd4fKv6OrAa' },
        {
          url: '/_next/static/chunks/app/_not-found/page-50b37b2702670edb.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/app/layout-3ee76db13602fc83.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/app/login/page-b53cba04d4ce498c.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/app/main/layout-c2070aab9a3bbd84.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/app/main/page-2b413ebaa22c9f8c.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/app/mypage/layout-1e3700357d2d3f42.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/app/mypage/page-dfa12bc895773006.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/app/page-ec5351303015d270.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/app/pdf/%5BreportId%5D/page-0307e74aa40cf5bd.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/app/regist/page-be794ed06a2e0f9b.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/c916193b-e44422c2eafe9e16.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/f7333993-c5a1cd1b50b34071.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/f8025e75-1e9ac10bd4b39280.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/f97e080b-a34f720d248fc61e.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/fd9d1056-bd1f8b4b9f4ae0db.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/framework-f66176bb897dc684.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        { url: '/_next/static/chunks/main-5d4ca763771245e8.js', revision: 'i6EhuQXpwTnd4fKv6OrAa' },
        {
          url: '/_next/static/chunks/main-app-fdb18bf1d0f9d81f.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/pages/_app-72b849fbd24ac258.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/pages/_error-7ba65e1336b92748.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-58824bb747109d25.js',
          revision: 'i6EhuQXpwTnd4fKv6OrAa',
        },
        { url: '/_next/static/css/495c97fa3dc0a609.css', revision: '495c97fa3dc0a609' },
        { url: '/_next/static/css/7a541410d5e95eb5.css', revision: '7a541410d5e95eb5' },
        { url: '/_next/static/css/801a93637a101b0a.css', revision: '801a93637a101b0a' },
        { url: '/_next/static/css/8799cfa5f11821f0.css', revision: '8799cfa5f11821f0' },
        { url: '/_next/static/css/87b1e6f08f08f594.css', revision: '87b1e6f08f08f594' },
        { url: '/_next/static/css/87d248041074b03a.css', revision: '87d248041074b03a' },
        { url: '/_next/static/css/c9864a0fb8a880e9.css', revision: 'c9864a0fb8a880e9' },
        { url: '/_next/static/css/e9faf63de9c0fdce.css', revision: 'e9faf63de9c0fdce' },
        { url: '/_next/static/css/eb1cd46fb6d7ac0e.css', revision: 'eb1cd46fb6d7ac0e' },
        {
          url: '/_next/static/i6EhuQXpwTnd4fKv6OrAa/_buildManifest.js',
          revision: 'c155cce658e53418dec34664328b51ac',
        },
        {
          url: '/_next/static/i6EhuQXpwTnd4fKv6OrAa/_ssgManifest.js',
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
          url: '/_next/static/media/xrayImg.057d54d5.jpg',
          revision: '9eb07ec565ccd4cc3020e0e90e92b927',
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
