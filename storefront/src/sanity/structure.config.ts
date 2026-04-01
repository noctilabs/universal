import type { StructureResolver } from "sanity/structure"

const SINGLETON_TYPES = ["siteSettings", "aboutPage", "agendaPage", "archivePage"]

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ── Pages (singletons) ─────────────────────────────────
      S.listItem().title("Pages").child(
        S.list().title("Pages").items([
          S.listItem()
            .title("Site Settings")
            .id("siteSettings")
            .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
          S.listItem()
            .title("About Page")
            .id("aboutPage")
            .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
          S.listItem()
            .title("Agenda Page")
            .id("agendaPage")
            .child(S.document().schemaType("agendaPage").documentId("agendaPage")),
          S.listItem()
            .title("Archive Page")
            .id("archivePage")
            .child(S.document().schemaType("archivePage").documentId("archivePage")),
        ])
      ),

      S.divider(),

      // ── Collections ────────────────────────────────────────
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.includes(item.getId() ?? "")
      ),
    ])
