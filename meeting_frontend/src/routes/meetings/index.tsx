import { component$, useStore, $, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

type Meeting = {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: string[];
  roomLink: string;
  notes?: string;
  status?: "scheduled" | "in-progress" | "completed" | "canceled";
};

const seed: Meeting[] = [
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
  const store = useStore<{ items: Meeting[] }>({ items: seed });
  const search = useSignal("");

  const filtered = () =>
    store.items.filter(
      (m) =>
        m.title.toLowerCase().includes(search.value.toLowerCase()) ||
        m.participants.join(", ").toLowerCase().includes(search.value.toLowerCase()),
    );

  const remove = $((id: string) => {
    store.items = store.items.filter((i) => i.id !== id);
  });

  return (
    <div class="container" style="display:grid;gap:16px;">
      <section class="card" style="padding:16px; display:grid; gap:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <h1 style="margin:0;">Meetings</h1>
          <div style="display:flex; gap:8px;">
            <input
              class="input"
              type="search"
              placeholder="Search by title or participant"
              value={search.value}
              onInput$={(e) => (search.value = (e.target as HTMLInputElement).value)}
            />
            <a class="btn" href="/meetings/create">+ New</a>
          </div>
        </div>
      </section>

      <section class="meeting-list">
        {filtered().map((m) => (
          <article class="meeting-card" key={m.id}>
            <div style="display:flex; justify-content:space-between; gap:12px; align-items:center; flex-wrap:wrap;">
              <div style="display:grid; gap:6px;">
                <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                  <strong>{m.title}</strong>
                  <span class="badge">{m.date} • {m.time}</span>
                  {m.status && <span class="badge" style="background: rgba(245, 158, 11, 0.12); border-color: rgba(245,158,11,0.25); color:#9a5a00;">{m.status}</span>}
                </div>
                <div class="meeting-meta">
                  <span>{m.participants.length} participants</span>
                  <span>Room: {m.roomLink.replace("https://", "")}</span>
                </div>
              </div>
              <div style="display:flex; gap:8px;">
                <a class="btn ghost" href={`/meetings/${m.id}`}>View</a>
                <a class="btn secondary" href={`/meetings/${m.id}/edit`}>Edit</a>
                <button class="btn error" onClick$={() => remove(m.id)}>Delete</button>
              </div>
            </div>
          </article>
        ))}
        {filtered().length === 0 && (
          <div class="card" style="padding:16px;">
            <div class="helper">No meetings to show.</div>
          </div>
        )}
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: "All Meetings - Ocean",
};
