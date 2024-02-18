// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Artist, Album, Song } = initSchema(schema);

export {
  Artist,
  Album,
  Song
};