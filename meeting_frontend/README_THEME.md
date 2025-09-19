# Ocean Professional UI - Meeting Frontend

This Qwik app implements a dashboard-style UI for scheduling, joining, and managing meetings with the Ocean Professional theme.

Key Theme Tokens:
- Primary: #2563EB
- Secondary: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Structure:
- Navbar (sticky, translucent)
- Sidebar (navigation and quick actions)
- Main content shows dashboard, meetings list/detail, create/edit forms

Notes:
- All actions are placeholders; no backend integration is wired yet.
- Mock data is used on meetings routes.
- Add integration by replacing alerts and stores with server calls when backend is available.

Run locally:
- npm install
- npm start
- Open the browser and explore:
  - / (dashboard)
  - /meetings (list)
  - /meetings/create (new meeting)
  - /meetings/:id (detail)
  - /meetings/:id/edit (edit)
  - /meetings/join (join via code)
