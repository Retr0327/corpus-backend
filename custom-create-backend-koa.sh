# $1: new dir name

# ----- constants -----

CURRENT_DIR=$PWD
NEW_DIR="$CURRENT_DIR/$1"

# --- helper functions ---

install_packages() {
  pnpm init
  pnpm i @koa/cors @koa/router dotenv koa koa-bodyparser koa-conditional-get koa-etag koa-morgan yup 
  pnpm i -D @types/etag @types/koa @types/koa-bodyparser @types/koa-conditional-get @types/koa-etag \
      @types/koa-morgan @types/koa__cors @types/koa__router @types/node @typescript-eslint/eslint-plugin \
      @typescript-eslint/parser eslint eslint-config-airbnb-base eslint-config-airbnb-typescript \
      eslint-config-prettier eslint-plugin-import eslint-plugin-n eslint-plugin-promise husky lint-staged \
      nodemon prettier ts-node tsc-alias tsconfig-paths typescript
  pnpm tsc --init   
}

build_backend_dir() {
  mkdir ./src ./src/api ./src/api/controllers ./src/api/routes ./src/api/utils ./src/api/utils/logger \
      ./src/api/models ./src/api/configs ./src/api/middlewares ./src/api/validations
  
  file_names=('./src/index.ts' './src/api/index.ts' './src/api/utils/logger/index.ts' './src/api/routes/index.ts' \
      './src/api/configs/cors.ts' './src/api/configs/index.ts' './.eslintignore' './.eslintrc.json' './.lintstagedrc' \
      './.prettierignore' './.prettierrc')

  for name in "${file_names[@]}"; do
      touch $name;
  done
}  

create_content() {
  echo "import { config } from 'dotenv';
import app from './api';

config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server] Listening on port ${PORT}`);
});" >> ./src/index.ts

  echo "import Koa from 'koa';
import router from '@routes';
import cors from '@koa/cors';
import koaEtag from 'koa-etag';
import morgan from 'koa-morgan';
import { corsConfig } from '@configs';
import bodyParser from 'koa-bodyparser';
import customDevFormat from '@utils/logger';
import koaConditionalGet from 'koa-conditional-get';

morgan.format('custom-dev', customDevFormat);

const app = new Koa();

app.use(morgan('custom-dev'));
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    ctx.body = { status: 'failed' };
  }
});

app.use(koaConditionalGet());
app.use(koaEtag());
app.use(cors(corsConfig));
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

export default app;" >> ./src/api/index.ts

  echo 'import { Context } from "koa";
import { ServerResponse } from "http";
import { compile, TokenIndexer } from "koa-morgan";

function addPadding(word: string | undefined, padding: number): string {
  let target = word;
  if (target === undefined) {
    target = "";
  }

  const pad = " ";
  const wordLength = target.length;
  const paddingToAdd = padding - wordLength;

  if (paddingToAdd <= 0) {
    return target;
  }

  return target + pad.repeat(paddingToAdd);
}

function formatDate(date: string) {
  return date.toString().replace(/:/g, "-").replace(/\//g, "-").replace(" ", "-");
}

const customDevFormat = (tokens: TokenIndexer, req: Context["req"], res: ServerResponse) => {
  const status = res.headersSent ? res.statusCode : undefined;

  let now = "";
  const ip = "";
  const uid = "";
  let methodLength = 9;

  if (process.env.NODE_ENV === "production") {
    methodLength = 8;

    now = new Date().toLocaleString("zh-tw", {
      hour12: false,
      timeZone: "Asia/Taipei",
    });

    now = formatDate(now);
    now = `${addPadding(now, 19)}  `;
  }

  /* eslint-disable no-nested-ternary */
  const color =
    status! >= 500
      ? 31 // red
      : status! >= 400
      ? 33 // yellow
      : status! >= 300
      ? 36 // cyan
      : status! >= 200
      ? 32 // green
      : 0; // no color

  const fn = compile(
    `${now}${ip}\x1b[0m${addPadding(req.method, methodLength)}${addPadding(
      req.url,
      17,
    )} \x1b[${color}m:status\x1b[0m  ${uid}:response-time ms\x1b[0m`,
  );

  return fn(tokens, req, res);
};

export default customDevFormat;' >> ./src/api/utils/logger/index.ts

  echo "import { PREFIX } from '@configs';
import Router, { RouterContext } from '@koa/router';

const router = new Router();

router.prefix(PREFIX);

router.get('/', (ctx: RouterContext) => {
  const ip = ctx.request.ip.replace('::ffff:', '');
  ctx.status = 200;
  ctx.body = { status: 'success', ip };
});

export default router;" >> ./src/api/routes/index.ts

  echo "import { Options } from '@koa/cors';

const corsConfig: Options = {
  origin: (ctx) => {
    const allowList = ['http://localhost:3001', 'http://localhost:3002'];
    const origin = ctx.request.header.origin ?? '';
    if (allowList.includes(origin)) {
      return origin;
    }
    return '';
  },
  credentials: true,
};

export default corsConfig;" >> ./src/api/configs/cors.ts

  echo "import corsConfig from './cors';

const isProduction = process.env.NODE_ENV === 'production';

const PREFIX = isProduction ? '/api' : '/';

export { corsConfig, PREFIX };" >> ./src/api/configs/index.ts

  echo 'node_modules
dist' >> ./.eslintignore

  echo '{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["airbnb-base", "airbnb-typescript/base", "prettier"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "no-console": ["error"]
  }
}' >> ./.eslintrc.json

  echo '{
  "*.{ts,js}": [
    "prettier --write",
    "eslint"
  ]
}' >> ./.lintstagedrc

  echo "dist
package.json
pnpm-lock.yaml
tsconfig.json" >> ./.prettierignore

  echo '{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all"
}' >> ./.prettierrc 
}

update_package_json() {
  tmp=$(mktemp)
  jq '.main = "index.js"' package.json > "$tmp" && mv "$tmp" package.json
  jq 'del(.scripts.test)' package.json > "$tmp" && mv "$tmp" package.json
  jq '.scripts.dev = "nodemon src/index.ts"' package.json > "$tmp" && mv "$tmp" package.json
  jq '.scripts.start = "PORT=3001 NODE_ENV=production node -r dotenv/config dist/src/index.js"' package.json > "$tmp" && mv "$tmp" package.json
  jq '.scripts.build = "tsc && tsc-alias"' package.json > "$tmp" && mv "$tmp" package.json
  jq '.scripts.typecheck = "tsc --noEmit"' package.json > "$tmp" && mv "$tmp" package.json
  jq '.scripts.lint = "eslint ."' package.json > "$tmp" && mv "$tmp" package.json
  jq '.scripts.format = "prettier --write ."' package.json > "$tmp" && mv "$tmp" package.json
  jq '.scripts.prepare = "husky install"' package.json > "$tmp" && mv "$tmp" package.json
}
 

mkdir $NEW_DIR
cd $NEW_DIR
install_packages
build_backend_dir
create_content
update_package_json
pnpm run lint 
pnpm run format
pnpm run prepare 
pnpm husky set .husky/pre-commit "pnpm lint-staged"
pnpm husky set .husky/pre-push "pnpm typecheck"  
code $NEW_DIR