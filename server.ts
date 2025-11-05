import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// 👇 AÑADIDO: Helmet
// Si tu TS se queja del default import, usa:  import * as helmet from 'helmet';
import helmet from 'helmet';

// 1) Define una única CSP para todo
const CSP = [
  "default-src 'self'",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
  "script-src 'self' https://www.youtube.com https://s.ytimg.com",
  "img-src 'self' data: https://i.ytimg.com https://*.ggpht.com",
  "connect-src 'self' https://www.youtube.com https://*.googlevideo.com",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'"
].join('; ');

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // 2) Helmet primero
  server.disable('x-powered-by');
  server.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // Helmet pone defaults; nosotros los reforzamos:
          "default-src": ["'self'"],
          "frame-src": ["'self'", "https://www.youtube.com", "https://www.youtube-nocookie.com"],
          "script-src": ["'self'", "https://www.youtube.com", "https://s.ytimg.com"],
          "img-src": ["'self'", "data:", "https://i.ytimg.com", "https://*.ggpht.com"],
          "connect-src": ["'self'", "https://www.youtube.com", "https://*.googlevideo.com"],
          "object-src": ["'none'"],
          "base-uri": ["'self'"],
          "frame-ancestors": ["'self'"],
        },
      },
    })
  );

  // 3) (Cinturón y tirantes) Fuerza CSP en TODA respuesta
  server.use((_, res, next) => {
    res.setHeader('Content-Security-Policy', CSP);
    next();
  });

  // 4) Sirve estáticos SIN index.html y con cache fuerte SOLO para assets
  server.use(express.static(browserDistFolder, {
    index: false,                // <- MUY IMPORTANTE (no devuelvas index desde static)
    maxAge: '1y',
    setHeaders: (res, path) => {
      // No-cache para HTML por si cae algún .html suelto
      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-store');
      }
    }
  })); // :contentReference[oaicite:1]{index=1}

  // 5) Todas las rutas HTML renderizadas por SSR (+ no-store)
  server.get('**', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');

    const { protocol, originalUrl, baseUrl, headers } = req;
    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}
