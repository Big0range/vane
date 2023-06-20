import moduleAlias from 'module-alias';
import path from 'path';
moduleAlias.addAlias('@', path.resolve(__dirname, '../'));
moduleAlias.addAlias('@root', path.resolve(__dirname, '../../../'));
moduleAlias.addAlias('@vane/utils', path.resolve(__dirname, '../../../utils'));
