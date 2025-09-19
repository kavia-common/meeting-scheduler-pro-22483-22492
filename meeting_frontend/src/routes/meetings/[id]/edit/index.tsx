import { component$, useStore, useVisibleTask$, $, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";

type EditForm = {
  title: string;
  date: string;
  time: string;
  participants: string;
  roomLink: string;
  notes: string;
};

// PUBLIC_INTERFACE
export default component$(() => {
  const loc = useLocation();
  const form = useStore<EditForm>({
    title: "",
    date: "",
    time: "",
    participants: "",
    roomLink: "",
    notes: "",
  });
  const saved = useSignal(false);

  useVisibleTask$(() => {
    // Mock load
    const id = loc.params.id;
    form.title = "Mock Meeting " + id;
    form.date = new Date().toISOString().substring(0, 10);
    form.time = "11:30";
    form.participants = "alice@ocean.app, bob@ocean.app";
    form.roomLink = "https://meet.example.com/room/" + id;
    form.notes = "Editable notes for meeting " + id;
  });

  const save = $(() => {
    saved.value = true;
    alert("Saved (stub). Implement backend later.");
    setTimeout(() => (saved.value = false), 1500);
  });

  return (
    <div class="container" style="display:grid; gap:16px;">
      <section class="card" style="padding:18px;">
        <h1 style="margin-top:0;">Edit Meeting</h1>
        <div class="helper">Update details and save changes.</div>
      </section>

      <section class="card" style="padding:18px; display:grid; gap:14px;">
        <div>
          <label class="label">Title</label>
          <input class="input" type="text" value={form.title} onInput$={(e) => (form.title = (e.target as HTMLInputElement).value)} />
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
          <input class="input" type="text" value={form.participants} onInput$={(e) => (form.participants = (e.target as HTMLInputElement).value)} />
          <div class="helper">Emails, comma separated</div>
        </div>
        <div>
          <label class="label">Room Link</label>
          <input class="input" type="url" value={form.roomLink} onInput$={(e) => (form.roomLink = (e.target as HTMLInputElement).value)} />
        </div>
        <div>
          <label class="label">Notes</label>
          <textarea class="textarea" rows={4} value={form.notes} onInput$={(e) => (form.notes = (e.target as HTMLTextAreaElement).value)} />
        </div>

        <div style="display:flex; gap:8px;">
          <button class="btn" onClick$={save}>Save Changes</button>
          <a class="btn ghost" href={`/meetings/${loc.params.id}`}>Cancel</a>
          {saved.value && <span class="badge">Saved</span>}
        </div>
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Edit Meeting - Ocean",
};
