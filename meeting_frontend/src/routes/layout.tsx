import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

// PUBLIC_INTERFACE
export default component$(() => {
  useStyles$(styles);
  return (
    <div class="app-shell">
      <nav class="navbar">
        <div class="navbar-inner">
          <div class="brand">
            <div class="brand-badge">🌊</div>
            Ocean Meetings
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <a class="btn ghost" href="/">Dashboard</a>
            <a class="btn" href="/meetings/create">Schedule</a>
          </div>
        </div>
      </nav>
      <aside class="sidebar">
        <div class="card" style="padding:14px;">
          <div class="section-title">Navigation</div>
          <a class="nav-item" href="/meetings">All Meetings</a>
          <a class="nav-item" href="/meetings/today">Today's Meetings</a>
          <a class="nav-item" href="/meetings/upcoming">Upcoming</a>
          <a class="nav-item" href="/meetings/create">Create Meeting</a>
        </div>
        <div class="card" style="padding:14px;margin-top:12px;">
          <div class="section-title">Quick Actions</div>
          <a class="nav-item" href="/meetings/join">Join via Code</a>
          <a class="nav-item" href="/meetings">Manage Meetings</a>
        </div>
      </aside>
      <main class="main">
        <Slot />
      </main>
    </div>
  );
});
