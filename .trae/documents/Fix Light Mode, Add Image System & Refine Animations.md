I will implement the following changes to fix light mode, set up a local image system, and refine animations.

### 1. Fix Light Mode & Visuals
*   **Issue**: The "black screen" in light mode suggests CSS variables aren't updating correctly, or the Tailwind configuration isn't picking up the theme change.
*   **Fix**:
    *   Update `index.css` to ensure `.light-mode` correctly overrides the root color variables.
    *   Verify `App.tsx` applies the class to the `<html>` element.
    *   Refine the light mode color palette (making the white slightly softer, e.g., `#f8fafc` instead of pure white) to reduce harshness.

### 2. Image Management System
*   **Action**: Create a structured folder system for your images so you can easily replace the mockups.
*   **Structure**:
    ```
    public/
      assets/
        projects/
          g-rump/
            cover.jpg
            gallery/
          reaper/
            cover.jpg
    ```
*   **Code Update**: I will update `Projects.tsx` to reference these local paths. Since the images won't exist yet, I'll add a **fallback mechanism** that shows a stylish "Image Not Found" placeholder (or keeps the mock images until you replace them) so the site doesn't break.

### 3. Refine Animations
*   **Hero Animation**: Add "Linear Interpolation" (Lerp) to the mouse parallax effect. This makes the background layers float smoothly and "lag" slightly behind the mouse, creating a premium, weighty feel.
*   **CSS Animations**: Update `index.css` to use custom Bezier curves (e.g., `cubic-bezier(0.2, 0.8, 0.2, 1)`) instead of standard "ease-in-out" for more natural, fluid motion.

**Proposed File Changes**:
1.  `index.css`: Fix light mode variables and refine animation keyframes.
2.  `App.tsx`: Verify theme toggling.
3.  `components/Hero.tsx`: Add smooth parallax (Lerp).
4.  `components/Projects.tsx`: Update image sources to local paths.
5.  `public/`: Create the folder structure.
