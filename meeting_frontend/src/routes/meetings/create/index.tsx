import { component$, useStore, $, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

type CreateForm = {
  title: string;
  date: string;
  time: string;
  participants: string; // comma separated
  roomLink: string;
  notes: string;
};

const initialDate = new Date().toISOString().substring(0, 10);

// PUBLIC_INTERFACE
export default component$(() => {
  const form = useStore<CreateForm>({
    title: "",
    date: initialDate,
    time: "10:00",
    participants: "",
    roomLink: "",
    notes: "",
  });
  const createdId = useSignal<string | null>(null);

  const submit = $(() => {
    // Placeholder: simulate creation and ID assignment
    const id = "m-" + Math.floor(1000 + Math.random() * 9000);
    createdId.value = id;
    alert(`Meeting created (stub): ${id}`);
  });

  return (
    <div class="container" style="display:grid; gap:16px;">
      <section class="card" style="padding:18px;">
        <h1 style="margin-top:0;">Schedule a New Meeting</h1>
        <div class="helper">Fill out the details below to create your meeting.</div>
      </section>

      <section class="card" style="padding:18px; display:grid; gap:14px;">
        <div>
          <label class="label">Title</label>
          <input class="input" type="text" value={form.title} onInput$={(e) => (form.title = (e.target as HTMLInputElement).value)} placeholder="e.g., Weekly Sync" />
        </div>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
          <div>
            <label class="label">Date</label>
            <input class="input" type="date" value={form.date} onInput$={(e) => (form.date = (e.target as HTMLInputElement).value)} />
          </div>
          <div>
            <label class="label">Time</label>
            <input class="input" type="time" value={form.time} onInput$={(e) => (form.time = (e.target as HTMLInputElement).value)} />
          </div>
        </div>
        <div>
          <label class="label">Participants</label>
          <input class="input" type="text" value={form.participants} onInput$={(e) => (form.participants = (e.target as HTMLInputElement).value)} placeholder="Emails, comma separated" />
          <div class="helper">Example: alice@ocean.app, bob@ocean.app</div>
        </div>
        <div>
          <label class="label">Room Link</label>
          <input class="input" type="url" value={form.roomLink} onInput$={(e) => (form.roomLink = (e.target as HTMLInputElement).value)} placeholder="https://meet.example.com/room/my-meeting" />
        </div>
        <div>
          <label class="label">Notes</label>
          <textarea class="textarea" rows={4} value={form.notes} onInput$={(e) => (form.notes = (e.target as HTMLTextAreaElement).value)} placeholder="Agenda, prep notes, etc." />
        </div>

        <div style="display:flex; gap:8px; align-items:center;">
          <button class="btn" onClick$={submit}>Create Meeting</button>
          <a class="btn ghost" href="/meetings">Cancel</a>
        </div>
        {createdId.value && (
          <div class="helper">Created! See <a href={`/meetings/${createdId.value}`}>details</a>.</div>
        )}
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Create Meeting - Ocean",
};
