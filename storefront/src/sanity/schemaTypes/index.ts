import { type SchemaTypeDefinition } from 'sanity'

// Objects (reusable components)
import blockContent from './objects/blockContent'
import seo from './objects/seo'

// Documents
import event from './documents/event'
import media from './documents/media'
import resource from './documents/resource'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    blockContent,
    seo,
    // Documents
    event,
    media,
    resource,
  ],
}
