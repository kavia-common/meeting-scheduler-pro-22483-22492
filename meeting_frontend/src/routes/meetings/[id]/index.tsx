import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";

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

// PUBLIC_INTERFACE
export default component$(() => {
  const loc = useLocation();
  const meeting = useSignal<Meeting | null>(null);

  useVisibleTask$(() => {
    // Mock fetch by id
    const id = loc.params.id;
    meeting.value = {
      id,
      title: "Mock Meeting " + id,
      date: new Date().toISOString().substring(0, 10),
      time: "11:30",
      participants: ["alice@ocean.app", "bob@ocean.app", "you@ocean.app"],
      roomLink: "https://meet.example.com/room/" + id,
      notes: "This is a mocked meeting detail page.",
      status: "scheduled",
    };
  });

  const join = $(() => {
    alert("Join meeting (stub). Implement integration.");
  });

  const markCompleted = $(() => {
    if (meeting.value) {
      meeting.value = { ...meeting.value, status: "completed" };
    }
  });

  if (!meeting.value) {
    return <div class="helper">Loading meeting...</div>;
  }

  const m = meeting.value;

  return (
    <div class="container" style="display:grid; gap:16px;">
      <section class="card" style="padding:18px; display:grid; gap:10px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
          <div style="display:grid; gap:6px;">
            <h1 style="margin:0;">{m.title}</h1>
            <div class="meeting-meta">
              <span class="badge">{m.date} • {m.time}</span>
              <span>Status: {m.status}</span>
            </div>
          </div>
          <div style="display:flex; gap:8px;">
            <a class="btn secondary" href={`/meetings/${m.id}/edit`}>Edit</a>
            <button class="btn" onClick$={join}>Join</button>
          </div>
        </div>
      </section>

      <section class="card" style="padding:18px; display:grid; gap:12px;">
        <div style="display:grid; gap:4px;">
          <div class="label">Room Link</div>
          <a href={m.roomLink} target="_blank" rel="noreferrer">{m.roomLink}</a>
        </div>

        <div style="display:grid; gap:4px;">
          <div class="label">Participants</div>
          <div class="meeting-meta">{m.participants.join(", ")}</div>
        </div>

        <div style="display:grid; gap:4px;">
          <div class="label">Notes</div>
          <div class="helper">{m.notes || "No notes provided."}</div>
        </div>

        <div style="display:flex; gap:8px;">
          <button class="btn ghost" onClick$={markCompleted}>Mark Completed</button>
          <a class="btn ghost" href="/meetings">Back to list</a>
        </div>
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Meeting Details - Ocean",
};
