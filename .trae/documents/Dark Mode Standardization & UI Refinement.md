I will proceed with the following changes to remove light mode, fix the contact button, and redesign the Contact and Projects sections for a seamless look.

**1. Remove Light Mode & Cleanup:**

* **`App.tsx`**: Remove `isLightMode` state, `toggleTheme` function, and the `useEffect` that manages the `light-mode` class. Remove the theme toggle button from the Navbar.

* **`components/Hero.tsx`**: Remove `isLightMode` props and hardcode the "dark mode" visuals (e.g., canvas colors, floating icons).

* **`index.css`**: Remove all `html.light-mode` overrides, locking the site to the dark theme variables.

**2. Fix Contact Button in Hero:**

* **`components/Hero.tsx`**: Update the "Contact System" button to be high-contrast: **White Background with Black Text** (`bg-white text-black`), ensuring readability and visual weight equal to the "View Projects" button.

**3. Redesign Project Cards (Seamless Look):**

* **`components/Projects.tsx`**:

  * Remove the `bg-brand-surface` background and `border-brand-border` from the project cards.

  * The cards will now be clean, image-forward elements that blend directly into the page background (`bg-transparent` or subtle blending).

  * Maintain the hover overlay for details but remove the "boxed" feel.

**4. Redesign Contact Section:**

* **`components/Contact.tsx`**:

  * Remove the "boxed" card styling (`bg-brand-surface`, borders) from the Email and GitHub links.

  * Refactor them into a cleaner, minimal layout (e.g., large floating text or minimal hover-state blocks) that feels integrated with the footer rather than separate widgets.

