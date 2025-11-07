# SmartAdmin Login Assistant

<p align="center">
  <img src="https://github.com/uparcelchengz/smartadmin-app-login-extension/blob/main/ChromeExtension/logo.png?raw=true" alt="SmartAdmin Logo" width="160" />
</p>

> A Chrome extension that enables browser → desktop login integration for the SmartAdmin app (capstone project).

**Important:** The primary purpose of this extension is to assist the SmartAdmin desktop application used in the author's capstone project. The automatic save/fill and OTP automation features are provided as convenient extras to make the extension useful during development and testing.

---

## Overview

SmartAdmin Login Assistant helps bridge the browser and the SmartAdmin desktop app by providing a deep-link login mechanism (e.g. `smartadmin://login?...`) so your desktop application can be launched and authenticated from the browser. The extension also includes optional conveniences such as:

- Auto-saving and auto-filling username & password on the SmartAdmin login pages
- TOTP (time-based) code generation and optional auto-fill for 2FA
- UI to manage credentials, environment (staging/production) detection, and settings
- Configurable cleanup options (clear after login, daily cleanup, etc.)

All automatic features are optional and configurable; the core value is the browser → app login workflow for the SmartAdmin desktop app (the capstone project).

---

## Key Features

- Deep-link login: send credentials from the browser to the SmartAdmin desktop app using a custom URI scheme.
- Optional auto-save / auto-fill of login forms on SmartAdmin pages.
- TOTP generation and auto-fill (configurable).
- Settings UI in the extension popup (auto-login, remember credentials, clear-after-login, etc.).
- Background process to optionally clear credentials on a daily basis (configurable).
- All data stored locally in `chrome.storage.local` — no remote servers.

## Quick Start (Developer / Tester)

1. Build / prepare the extension (repo root contains `manifest.json`).
2. Open Chrome and go to Extensions → enable Developer mode.
3. Click **Load unpacked** and pick this repository folder (the folder that contains `manifest.json`).
4. Visit your SmartAdmin site (staging or production). The extension will inject content scripts on the matching pages to offer saving/auto-fill and OTP support.

### Notes
- Do not open `index.html` directly via file:// — open the extension popup from the browser toolbar to use the extension UI (this ensures `chrome.storage` is available).

## Usage

- Save credentials: Log in at `https://stg.uparcel.sg/admin/login/` or `https://www.uparcel.sg/admin/login/` and accept the prompt to save credentials.
- Save OTP secret: Open `https://*/admin/view_profile/` and the extension will capture the secret into `profileData`.
- Login to desktop app: Open the extension popup and click **Login to SmartAdmin App** to trigger a deep link `smartadmin://login?...` which the desktop app can handle.

## Settings

Settings are available from the popup (click the gear icon). Examples of settings included:

- Clear Credentials — remove stored credentials immediately
- Remember Credentials — keep credentials across days
- Auto-login — attempt to login automatically
- Auto-fill OTP — enable/disable OTP auto-fill

Settings are saved in `chrome.storage.local` with keys prefixed by `setting_`.

## Security & Privacy

- All credentials and TOTP secrets are stored locally using `chrome.storage.local`.
- The extension does **not** send credentials to any external server.
- Users can clear stored data at any time via the Settings UI or by uninstalling the extension.

Please include a link to the project privacy policy (e.g. GitHub Pages) when publishing to the Chrome Web Store.

## Development Notes

- Content scripts:
  - `login.js` — handles saving and auto-filling username/password
  - `otp.js` + `otpauth.umd.min.js` — TOTP logic and auto-fill
  - `profile.js` — reads and stores profile/secret data
  - `home.js` — optional post-login actions
- Popup UI: `index.html`, `index.js`, `styles.css`
- Background worker: `background.js` (service worker for Manifest V3) — daily cleanup logic

## File Structure (important files)

```
manifest.json
index.html
index.js
styles.css
login.js
otp.js
otpauth.umd.min.js
profile.js
home.js
background.js
LICENSE
README.md
```

## License

This project is released under the **MIT License** — see the `LICENSE` file for details.

## Contact / Support

If you find a bug or want to request a feature, please open an issue: `https://github.com/uparcelchengz/smartadmin-app-login-extension/issues`.

---

If you'd like, I can produce a shorter marketing blurb for the Chrome Web Store short description and a more detailed store listing text.
