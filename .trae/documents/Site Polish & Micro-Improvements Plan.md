I have identified several "tiny" but impactful improvements to polish the site without major overhauls.

### 1. **Code Cleanup & Organization**
- **Extract `About` Section**: Currently, the "About" section is a large chunk of code inside `App.tsx`. I will move it to a dedicated `components/About.tsx` component. This makes the main `App` file cleaner and easier to manage.

### 2. **Visual Polish (The "Tiny Things")**
- **Custom Scrollbar**: I will add styles to `index.css` to customize the browser's default scrollbar. It will match your dark theme (dark track, `brand-accent` thumb) instead of the default OS gray/white bar.
- **Scroll Progress Bar**: I will add a subtle progress bar at the very top of the screen that fills up as the user scrolls down the page. This gives a nice sense of position on long portfolio pages.
- **Selection Style**: I will verify and potentially enhance the text selection color (`::selection`) to ensure it pops with your brand color globally.

### 3. **Component Refinements**
- **Contact Section**: I noticed the Contact section relies on standard links. I will apply a subtle "glow" effect to the Email and GitHub cards on hover, consistent with the new "View Projects" button animation I added earlier.

**Verification Plan:**
- Run `npm run dev` to visually verify the scrollbar, progress bar, and hover effects.
- Ensure the refactored `About` section still loads correctly (lazy loaded or direct import).
