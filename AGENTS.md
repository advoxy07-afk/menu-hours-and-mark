<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Menu items, prices and category visibility live only in src/data/menu.ts; UI reads from it so owners edit one file.
- Cart stores only menu IDs and quantities locally; resolve current prices and visibility from the central menu on every read so stale or tampered stored prices never determine orders.
- WhatsApp checkout is a client-side click-to-chat handoff, not a submitted order; keep message generation and integer-paise calculations in a pure tested cart module with no backend dependency.
