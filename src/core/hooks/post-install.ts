// filepath: /c:/Users/alexa/OneDrive/Documentos/Projetos/sqg-api/src/core/hooks/post-install.ts
import fs from 'fs';
import path from 'path';
import { ncp } from 'ncp';

const source = path.join(__dirname, '../../../tests');
const destination = path.join(process.cwd(), 'tests');

ncp(source, destination, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Tests folder copied to project directory.');
});