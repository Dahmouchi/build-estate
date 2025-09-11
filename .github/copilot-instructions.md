# Copilot Instructions for booking-project

## Project Overview
- This is a Next.js project (App Router) using TypeScript, Prisma, and NextAuth for authentication.
- The codebase is structured around language-localized routes (`src/app/[lang]`) and modular UI components in `src/components`.
- Data access is handled via Prisma, with the schema in `prisma/schema.prisma` and generated client in `src/generated/prisma`.
- Authentication and session management use NextAuth, with providers and helpers in `src/providers` and `src/lib/nextAuth.ts`.

## Key Patterns & Conventions
- **Localization:** All user-facing routes are nested under `[lang]` (e.g., `/en/`, `/fr/`, `/ar/`). Language switching is handled by updating the first path segment and setting `document.dir`.
- **Component Organization:** UI is split into `sections`, `ui`, and `header` subfolders under `src/components`. Use these for new UI elements.
- **Actions:** Server actions live in `src/actions` and are used for data mutations and business logic.
- **Prisma Usage:** Import the Prisma client from `src/lib/prisma.ts` for DB access. Schema changes require running `prisma migrate dev` and regenerating the client.
- **Authentication:** Use NextAuth helpers from `src/providers/NextAuthProvider.tsx` and `src/lib/nextAuth.ts`.
- **Assets:** Static files and images are in `public/`.

## Developer Workflows
- **Start Dev Server:** `npm run dev` (see README)
- **Prisma Migrations:**
  - Edit `prisma/schema.prisma`
  - Run `npx prisma migrate dev`
  - Regenerate client if needed
- **Localization:** Add new languages by updating `src/app/[lang]/dictionaries/` and `languages` array in `LangSwitcher.tsx`.
- **Add Components:** Place new UI in `src/components/ui/` or appropriate subfolder. Use existing patterns for props and styling.

## Integration Points
- **Prisma:** DB schema in `prisma/schema.prisma`, client in `src/lib/prisma.ts` and `src/generated/prisma`.
- **NextAuth:** Config in `src/providers/NextAuthProvider.tsx` and `src/lib/nextAuth.ts`.
- **Country Flags:** Use `country-flag-icons` package, import as in `LangSwitcher.tsx`.

## Examples
- See `src/components/LangSwitcher.tsx` for language switching and flag icon usage.
- See `src/app/[lang]/dictionaries/` for localization structure.
- See `src/actions/host.ts` for server action patterns.

## Notes
- Follow the file/folder conventions for new features.
- Use TypeScript strictness; avoid `any` unless necessary.
- Keep language keys and country codes in sync across localization and UI.
