I have identified the root cause of the "bad" light mode. The issue is that the application uses a mix of CSS variables and hardcoded Tailwind classes (like `bg-brand-black` and `text-brand-primary`) directly in the JSX. While the CSS variables switch values, the utility classes defined in `tailwind.config.js` map to those variables in a way that sometimes conflicts with the hardcoded "dark theme" logic in many components.

The previous fix patched the `Hero` section, but `App.tsx` and other components still hardcode `bg-brand-black`, which might not be fully overridden by the CSS variable changes if the specificity isn't right or if the class itself implies a dark color logic that doesn't translate well to light mode.

**The Plan:**

1.  **Refactor `App.tsx`**: Remove the hardcoded `bg-brand-black` from the main wrapper. Instead, use `bg-brand-black` only as a default, but ensure `light-mode` classes explicitly override it with `bg-white` or `bg-gray-50`.
2.  **Global Theme Reset**: Update `index.css` to properly redefine *all* brand colors for light mode. Instead of just mapping to white, `brand-black` in light mode should map to white/off-white, and `brand-primary` (text) should map to black. This allows the existing utility classes (`bg-brand-black`, `text-brand-primary`) to work automatically in light mode without changing every single component file.
    *   *Current*: `brand-black` -> `var(--bg-primary)` (which is 3 3 3).
    *   *New Strategy*: `brand-black` remains `var(--bg-primary)`, but in light mode, `var(--bg-primary)` becomes `255 255 255`.
3.  **Component Audit**:
    *   **Navbar**: Ensure the blur effect and text colors invert correctly.
    *   **About Section**: The gradients and "glass" panels need to be lighter and more subtle in light mode (gray/blue tint instead of dark gray).
    *   **Projects**: The cards have hardcoded dark borders and backgrounds. I will switch them to use the CSS variables so they auto-switch.
4.  **Refine Visuals**:
    *   Use a "frosted glass" aesthetic for light mode to maintain the premium feel.
    *   Ensure the "cyan" accent color is darker in light mode (`#0891b2`) so it's readable against white.

**Execution Steps:**
1.  Modify `index.css` to implement a complete variable swap system.
2.  Update `tailwind.config.js` if necessary (likely not, if variables are done right).
3.  Clean up `App.tsx` and `Hero.tsx` to rely on these variables rather than manual `isLightMode` checks where possible.
4.  Verify `Projects.tsx` and `Contact.tsx` for hardcoded dark values.
