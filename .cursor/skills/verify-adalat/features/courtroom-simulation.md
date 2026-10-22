# Courtroom simulation

Courtroom simulation lets a user act as counsel in an active legal proceeding, submitting custom arguments or objections, receiving timed rulings from Judge AI, and reviewing the trial verdict.

## Sub-features

- `court-custom-submit` enters and sends a custom legal submission via the text composer.
- `court-chip-submit` submits an argument or objection using pre-defined quick chips.
- `court-judge-response` verifies the Judge AI responds after a delay and updates the stage turn indicator.
- `court-verdict-modal` opens the trial verdict dialog, displays score analysis, and closes cleanly.

## How to get to it (user POV)

- Open `http://127.0.0.1:4173/courtroom.html` directly in the browser.
- Select the `Courtroom` link in the main navigation or shell sidebar from any page.
- Choose `Practise` on any case card in the Cause List (`cases.html`).

## Driving it with control-adalat

Preconditions:
- Adalat AI server is running and healthy at `http://127.0.0.1:4173`.
- `artifacts/verify-adalat/courtroom/` directory exists for evidence.

- **Open courtroom.** Navigate to `http://127.0.0.1:4173/courtroom.html`. The courtroom stage displays the presiding Judge AI and three counsel seats, and the proceedings log contains initial witness testimony.
- **Submit custom objection.** Type `I object to this line of questioning under Section 137 BSA.` into `input#composer-input` and click `button#composer-send` (or press Enter). A message bubble with class `.is-you` appears immediately in `#chat-stream`.
- **Receive judicial response.** Wait 800ms. A reply from `Judge AI` with class `.is-judge` appears in `#chat-stream` stating `Noted. Let the record reflect that. Counsel, you may proceed.`, and `#stage-status` displays `Your turn`.
- **Submit via quick chip.** Click `.chip-btn` labeled `Tender exhibit`. A new message with the tendered exhibit statement appears in `#chat-stream`, followed 700ms later by Judge AI's ruling.
- **Inspect verdict.** Click the trophy button `button#open-verdict`. The dialog `#verdict` becomes visible (`hidden=false`), announcing the verdict and displaying the advocacy score `6.9/10`.
- **Dismiss verdict.** Click the `Close` button (`loc=role:button[name='Close']`). The modal hides again.
- **Proof.** Capture the populated proceedings stream and stage state. Save an ARIA snapshot to `artifacts/verify-adalat/courtroom/proceedings.aria.txt` and a screenshot to `artifacts/verify-adalat/courtroom/proceedings.png`.

## Gotchas

- The Judge AI reply is triggered by a 700ms timer; assertions must wait for `#stage-status` to change to `Your turn` rather than checking immediately after send.
- The composer form uses `onsubmit="return false"`. Pressing Enter triggers a click event on `button#composer-send`.
- On narrow viewports (<900px), courtroom columns switch to mobile tab panes (`[data-tabs]`). Verification scripts should run at desktop widths (1280px+) unless testing responsive layouts.
