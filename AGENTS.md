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

## Architecture
- Use the root route for shared navigation and footer, with individual public content routes and unique page metadata, so every page is directly addressable.
- Keep service definitions and page metadata helpers in a shared browser-safe module to keep navigation, detail pages and form choices consistent.
- Keep all visual roles in the global semantic CSS design system and use Button variants for controls to maintain a consistent site.
- Contact enquiries use a validated public server function and a service-role-only database RPC with per-email transactional throttling; visitors must never read stored enquiries.
- Treat portfolio previews as illustrative concepts until the owner supplies real work; never invent clients, testimonials or performance claims.
- Use the shared motion controller for staggered leaf-level reveals, scroll progress, bounded visual drift and pointer tilt; keep reveal translation separate from hover transforms, respond to reduced-motion changes and clean up all listeners. Product demos must remain automatic and pausable.
- Service-specific outcomes, tools and process steps live in a browser-safe detail module, alongside scope-based engagement models; engagement prices carry explicit numeric bounds and billing periods, with owner-approved display values.
