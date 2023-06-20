import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ override: true });
if (
  process.env.NODE_ENV &&
  fs.existsSync(path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`))
) {
  dotenv.config({
    path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`),
    override: true,
  });
}
