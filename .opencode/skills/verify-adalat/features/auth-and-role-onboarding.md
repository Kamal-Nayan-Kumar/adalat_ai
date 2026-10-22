# Auth and role onboarding

Auth and role onboarding guides users through account registration, role specialization (Law student, Judiciary aspirant, Advocate, Academic), credential entry, and direct progression into the advocacy dashboard.

## Sub-features

- `auth-role-select` chooses a user persona to customize trial difficulty and practice focus.
- `auth-signup-fields` enters user name, email, and password credentials.
- `auth-login-flow` fills existing account credentials with a persistent sign-in preference.
- `auth-dashboard-redirect` submits the form and navigates to the practice overview.

## How to get to it (user POV)

- Open `http://127.0.0.1:4173/signup.html` or `http://127.0.0.1:4173/login.html`.
- Choose `Log in` or `Start practising` in the top header on `index.html`.
- Follow the `Already have an account? Log in` link on the registration screen.

## Driving it with control-adalat

Preconditions:
- Adalat AI server is running and healthy at `http://127.0.0.1:4173`.
- `artifacts/verify-adalat/auth/` directory exists.

- **Open signup page.** Navigate to `http://127.0.0.1:4173/signup.html`. The page presents a two-column split layout with artwork on the left and registration fields on the right.
- **Select legal persona.** By default, `input[name='role'][value='student']` is checked. Click the label `text='Judiciary aspirant'`. Verify its radio input (`input[value='aspirant']`) is checked.
- **Fill registration inputs.** Enter `Aarav` in `input#first`, `Sharma` in `input#last`, `aarav@example.com` in `input#email`, and `Practice2026!` in `input#password`.
- **Submit registration.** Click `button[type='submit']`. The browser navigates to `dashboard.html`.
- **Verify landing on dashboard.** Confirm the current URL ends with `dashboard.html` and the header reads `Practice overview`.
- **Test login page.** Navigate to `http://127.0.0.1:4173/login.html`. Fill `input#email` with `aarav@example.com` and `input#password` with `Secret123`. Click `button[type='submit']`. Verify transition to `dashboard.html`.
- **Proof.** Capture the completed signup form state and resulting dashboard landing to `artifacts/verify-adalat/auth/signup-filled.png` and `artifacts/verify-adalat/auth/dashboard-landed.png`.

## Gotchas

- The static prototype forms submit via GET (`action="dashboard.html" method="get"`), passing form data in URL query parameters.
- Both forms include client-side required attributes, but static files do not execute server-side auth validation.
- Mobile viewports hide the split artwork panel (`aside.auth-art`) and show only the form column.
