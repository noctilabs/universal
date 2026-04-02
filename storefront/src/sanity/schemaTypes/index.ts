import { type SchemaTypeDefinition } from 'sanity'

// Objects (reusable components)
import blockContent from './objects/blockContent'
import seo from './objects/seo'
import agendaRowItem from './objects/agendaRowItem'
import agendaRow from './objects/agendaRow'
import archiveFrame from './objects/archiveFrame'

// Documents
import event from './documents/event'
import media from './documents/media'
import resource from './documents/resource'
import siteSettings from './documents/siteSettings'
import aboutPage from './documents/aboutPage'
import agendaPage from './documents/agendaPage'
import archivePage from './documents/archivePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    blockContent,
    seo,
    agendaRowItem,
    agendaRow,
    archiveFrame,
    // Documents
    event,
    media,
    resource,
    siteSettings,
    aboutPage,
    agendaPage,
    archivePage,
  ],
}
