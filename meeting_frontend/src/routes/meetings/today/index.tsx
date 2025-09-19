import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  const today = new Date().toISOString().substring(0, 10);
  return (
    <div class="container" style="display:grid; gap:16px;">
      <section class="card" style="padding:18px;">
        <h1 style="margin:0;">Today's Meetings</h1>
        <div class="helper">Showing meetings for {today}. (Mock view)</div>
      </section>
      <section class="card" style="padding:18px;">
        <div class="helper">No data connected yet. Integrate with backend later.</div>
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Today's Meetings - Ocean",
};
