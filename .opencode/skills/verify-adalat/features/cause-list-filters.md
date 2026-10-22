# Cause list and filters

Cause list lets users search Indian case files by title, legal section, or factual keywords, filter by court jurisdiction, offence category, and statutory regime, and observe dynamic count updates and zero states.

## Sub-features

- `cases-search-keyword` filters displayed case cards matching text in title or facts.
- `cases-filter-dropdown` filters cases by court type, legal category, or statutory regime.
- `cases-count-update` updates the visible case counter dynamically.
- `cases-empty-state` displays a no-matching-cases message when filters eliminate all cards.
- `cases-launch-court` navigates into the courtroom simulator for a selected case.

## How to get to it (user POV)

- Open `http://127.0.0.1:4173/cases.html`.
- Choose the `Cause List` link from the sidebar navigation.
- Click `New session` in the top header of `dashboard.html`.

## Driving it with control-adalat

Preconditions:
- Adalat AI server is running and healthy at `http://127.0.0.1:4173`.
- `artifacts/verify-adalat/cases/` directory exists.

- **Open cause list.** Navigate to `http://127.0.0.1:4173/cases.html`. The page displays 9 default case cards and `#case-count` shows `9 cases`.
- **Search keyword.** Fill `input#case-search` with `murder`. Cards without murder keywords hide (`card.hidden = true`). `#case-count` updates to `1 case`.
- **Verify matching card.** Inspect the visible card. The heading reads `State vs. Ramesh Kumar` and displays the `District Criminal` court badge.
- **Filter by court jurisdiction.** Clear the search box, then select `criminal` in `select[data-filter='court']`. Only District Criminal cases remain visible.
- **Filter by legal regime.** Select `new` in `select[data-filter='regime']` (BNS 2023 and after). The cards update to only modern statutory cases.
- **Trigger zero state.** Fill `input#case-search` with `xyzunmatchedterm`. `#case-empty` becomes visible (`hidden=false`), and `#case-count` displays `0 cases`.
- **Reset and launch.** Clear the search input and reset all selects to empty values. All 9 cases return. Click `Practise` on the first card. The browser navigates to `courtroom.html`.
- **Proof.** Capture the filtered single-case view and the empty state. Save snapshots to `artifacts/verify-adalat/cases/filtered.png` and `artifacts/verify-adalat/cases/empty-state.png`.

## Gotchas

- Case card filtering checks both `data-case` (for search strings) and `data-meta` (for key-value pairs). Assertions should verify card `.hidden` properties.
- Multiple active filters combine with AND logic; selecting mutually exclusive filters properly renders `#case-empty`.
- The case counter uses singular `1 case` when exactly one matches, and plural `N cases` otherwise.
