# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2026-06-29

### Added
- Core theming architecture with `MagicProvider`, `useTheme`, and skin resolution.
- Theme contracts and built-in light/dark themes with named skins.
- Static design tokens: `spacing`, `radii`, `typography`, `shadows`, `motion`, `MIN_TOUCH`.
- Component library primitives: `Button`, `Type`, `Card`, `Field`, `Badge`, `Switch`, `ListRow`, `Checkbox`, `RadioButton`, `Avatar`, and `ProgressBar`.
- Utility hooks: `useReduceMotion` and `useBreakpoint`.
- Build and packaging pipeline for distributable `dist/` output with declaration files.
- Documentation set in `docs/` and usage reference in `README.md`.
- Local packaging workflow: `npm run pack:local`.

### Changed
- Standardized package metadata for publishing (`author`, `repository`, `homepage`, `bugs`).
- Consolidated docs to current API patterns and removed outdated architecture references.

### Notes
- This is a pre-1.0 release. API adjustments are expected as the library is validated in production apps.
- Initial public release used to secure the `mobile-magic` package name on npm before full 1.0 launch assets and rollout.
