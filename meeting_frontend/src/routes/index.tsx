import { component$, useSignal, $, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

type Meeting = {
  id: string;
  title: string;
  date: string; // ISO
  time: string; // HH:mm
  participants: string[];
  roomLink: string;
  notes?: string;
  status?: "scheduled" | "in-progress" | "completed" | "canceled";
};

const mockMeetings: Meeting[] = [
  {
    id: "m-1001",
    title: "Product Sync",
    date: new Date().toISOString().substring(0, 10),
    time: "10:00",
    participants: ["alice@ocean.app", "bob@ocean.app"],
    roomLink: "https://meet.example.com/room/product-sync",
    notes: "Discuss Q3 roadmap",
    status: "scheduled",
  },
  {
    id: "m-1002",
    title: "Design Review",
    date: new Date(Date.now() + 86400000).toISOString().substring(0, 10),
    time: "15:30",
    participants: ["design@ocean.app", "pm@ocean.app"],
    roomLink: "https://meet.example.com/room/design-review",
    notes: "Finalize wireframes",
    status: "scheduled",
  },
];

// PUBLIC_INTERFACE
export default component$(() => {
  const meetings = useStore<{ items: Meeting[] }>({ items: mockMeetings });
  const filter = useSignal<string>("");

  const filtered = () =>
    meetings.items.filter(
      (m) =>
        m.title.toLowerCase().includes(filter.value.toLowerCase()) ||
        m.participants.join(", ").toLowerCase().includes(filter.value.toLowerCase()),
    );

  const joinMeeting = $((id: string) => {
    // Placeholder join action
    alert(`Joining meeting ${id} (stub). Integration pending.`);
  });

  return (
    <div class="container" style="display:grid; gap:16px;">
      <section class="card" style="padding:18px; display:grid; gap:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
          <div>
            <h1 style="margin:0;font-size:22px;">Welcome to Ocean Meetings</h1>
            <div class="helper">Schedule, join, and manage your meetings in one place</div>
          </div>
          <div style="display:flex; gap:8px;">
            <a class="btn" href="/meetings/create">+ Schedule Meeting</a>
            <a class="btn ghost" href="/meetings">View All</a>
          </div>
        </div>
        <div class="badge">Ocean Professional Theme</div>
      </section>

      <section class="card" style="padding:18px; display:grid; gap:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
          <h2 style="margin:0;">Upcoming Meetings</h2>
          <div style="display:flex; gap:8px;">
            <input class="input" type="text" placeholder="Search meetings..." value={filter.value} onInput$={(e) => (filter.value = (e.target as HTMLInputElement).value)} />
            <a class="btn secondary" href="/meetings">Manage</a>
          </div>
        </div>
        <div class="meeting-list">
          {filtered().map((m) => (
            <article class="meeting-card" key={m.id}>
              <div style="display:flex; justify-content:space-between; gap:8px; align-items:center; flex-wrap:wrap;">
                <div style="display:grid; gap:6px;">
                  <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                    <strong>{m.title}</strong>
                    <span class="badge">{m.date} • {m.time}</span>
                  </div>
                  <div class="meeting-meta">
                    <span>{m.participants.length} participants</span>
                    <span>Room: {m.roomLink.replace("https://", "")}</span>
                  </div>
                </div>
                <div style="display:flex; gap:8px; align-items:center;">
                  <a class="btn" href={`/meetings/${m.id}`}>Details</a>
                  <button class="btn ghost" onClick$={() => joinMeeting(m.id)}>Join</button>
                </div>
              </div>
            </article>
          ))}
          {filtered().length === 0 && (
            <div class="helper">No meetings found for your search.</div>
          )}
        </div>
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Ocean Meetings Dashboard",
  meta: [
    {
      name: "description",
      content:
        "Modern dashboard to schedule, join, and manage meetings. Ocean Professional theme.",
    },
  ],
};
