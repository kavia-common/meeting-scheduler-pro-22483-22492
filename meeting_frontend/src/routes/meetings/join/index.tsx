import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  const code = useSignal("");
  const join = $(() => {
    alert(`Join by code "${code.value}" (stub).`);
  });

  return (
    <div class="container" style="display:grid; gap:16px;">
      <section class="card" style="padding:18px; display:grid; gap:12px;">
        <h1 style="margin:0;">Join a Meeting</h1>
        <div class="helper">Enter an invite code to join the meeting.</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <input class="input" placeholder="Enter code" value={code.value} onInput$={(e) => (code.value = (e.target as HTMLInputElement).value)} />
          <button class="btn" onClick$={join}>Join</button>
        </div>
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Join Meeting - Ocean",
};
