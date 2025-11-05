import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// 👇 AÑADIDO: Helmet
// Si tu TS se queja del default import, usa:  import * as helmet from 'helmet';
import helmet from 'helmet';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // 👇 AÑADIDO: seguridad base y CSP con YouTube permitido
  server.disable('x-powered-by');

  // Toma la política por defecto de Helmet y extiéndela
  const cspDefaults = helmet.contentSecurityPolicy.getDefaultDirectives();

  server.use(
    helmet({
      // Desactiva COEP para evitar choques innecesarios
      crossOriginEmbedderPolicy: false,
      // Política CSP
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          ...cspDefaults, // incluye: default-src 'self', frame-ancestors 'self', etc.

          // Permite iframes de YouTube
          "frame-src": ["'self'", "https://www.youtube.com", "https://www.youtube-nocookie.com"],

          // Permite scripts del player
          "script-src": [
            ...(cspDefaults["script-src"] || ["'self'"]),
            "https://www.youtube.com",
            "https://s.ytimg.com"
          ],

          // Permite imágenes y thumbnails
          "img-src": [
            ...(cspDefaults["img-src"] || ["'self'", "data:"]),
            "https://i.ytimg.com",
            "https://*.ggpht.com"
          ],

          // Permite conexiones del reproductor/streams
          "connect-src": [
            ...(cspDefaults["connect-src"] || ["'self'"]),
            "https://www.youtube.com",
            "https://*.googlevideo.com"
          ],

          // Endurecemos un poco más (ya vienen por defecto, pero los dejamos explícitos si quieres)
          "object-src": ["'none'"],
          "base-uri": ["'self'"],
          "frame-ancestors": ["'self'"],
        },
      },
    })
  );

  // Archivos estáticos (mantengo tu orden)
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // SSR
  server.get('**', (req, res, next) => {
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

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
