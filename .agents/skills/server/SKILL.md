---
name: server
description: Work on the Vane server app in apps/server. Use when adding, modifying, reviewing, or debugging server routes, serve-layer data access, middlewares, auth, logging, uploads, database-backed features, or Express response behavior in this repository.
---

# Vane Server

## Scope

Use this skill only for `apps/server`.

Primary folders:

- `src/routes/`: request handlers and business entry points
- `src/serve/`: database tables, typed service classes, and data methods
- `src/middlewares/`: Express middlewares
- `src/hooks/`: framework-level bootstrapping; avoid editing unless the routing system itself changes
- `src/types/`: shared type declarations
- `src/utils/`: reusable helpers
- `src/app.ts`: app wiring
- `src/server.ts`: startup

## Workflow

1. Read the relevant route file under `src/routes/`.
2. Read the matching serve file under `src/serve/`.
3. Preserve file-based routing conventions.
4. Put database access in `serve/`, not directly in routes unless matching nearby code already does it.
5. Return through `res.ok()` and `res.fail()`.
6. Export new serve instances from `src/serve/index.ts`.
7. Run focused checks after edits:
   - `pnpm --filter @vane/server lint`
   - `pnpm --filter @vane/server dev` only when runtime verification is needed

## Routing Rules

Routes are auto-loaded from `src/routes` by `src/hooks/useRouters.ts`.

Create route files using these patterns:

```text
src/routes/shop/list.ts                  -> GET /shop/list
src/routes/shop/index.post.ts            -> POST /shop
src/routes/shop/index.put.ts             -> PUT /shop
src/routes/shop/index.delete.ts          -> DELETE /shop
src/routes/table-temp-row/[code].post.ts -> POST /table-temp-row/:code
```

Rules:

- Default method is `get`.
- Method suffix supports `get`, `post`, `put`, `delete`.
- `index` maps to `/`.
- `[id]` maps to `/:id`.
- `[a,b,c]` maps to `/:a/:b/:c`.
- Export the route handler as default.
- Optional route middleware is exported as `middleware`.

Route skeleton:

```ts
import type { Request, Response } from 'express';
import { someServe } from '#/serve/index.ts';

export default async function (req: Request, res: Response) {
  try {
    const result = await someServe.list(req.query as any);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
}
```

Route with middleware:

```ts
import type { Request, Response } from 'express';
import { uploadImg } from '#/middlewares/upload.ts';

export const middleware = [uploadImg.single('file')];

export default async function (req: Request, res: Response) {
  try {
    res.ok({ data: req.file });
  } catch (error: any) {
    res.fail(error);
  }
}
```

## Response Rules

Use `res.ok()` for success:

```ts
res.ok({
  data: result,
});
```
