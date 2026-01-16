The user is unsatisfied with the current "light mode" implementation, describing it as "still not exactly fixed." Based on the provided screenshot and file content, the issue is that despite my previous changes, the Hero section is **still completely black**.

**Diagnosis:**

1. **Tailwind Config Issue**: The `tailwind.config.js` defines `colors.brand.black` using `rgb(var(--bg-primary) / <alpha-value>)`.
2. **CSS Variable Definition**: In `index.css`, `html.light-mode` correctly redefines `--bg-primary` to `250 250 250` (white).
3. **The Conflict**: In `Hero.tsx`, the main container has `bg-brand-black`.

   * Logic: `bg-brand-black` -> `rgb(var(--bg-primary))` -> `rgb(250 250 250)` (White).

   * *Why is it still black?* The screenshot shows a *pitch black* screen. This implies that either:

     * The `light-mode` class is **not** being applied to the `html` element.

     * The `Hero.tsx` component has a specific override or another element obscuring the background.

     * The `index.css` file on the deployed version might be cached or not building correctly.

**Crucial Find in** **`Hero.tsx`**:
Lines 230-241 in `Hero.tsx` show a `div` with an inline style for `backgroundImage` that uses `linear-gradient`.
Line 225: `className="... bg-brand-black ..."` - This *should* work if variables are swapping.

**Hypothesis**: The `light-mode` class is NOT being applied to the `<html>` tag correctly, or the build process isn't picking up the `index.css` changes as expected.

**Wait**, looking at the screenshot again... the text "WALT.BURGE" is dark grey/black? No, it's dark gray on a black background? No, the screenshot shows "WALT.BURGE" as dark gray on a *black* background. That's unreadable. This means `text-brand-primary` switched to dark (correct for light mode), but `bg-brand-black` stayed black (incorrect).

**Why would** **`text-brand-primary`** **switch but** **`bg-brand-black`** **not?**

* `text-brand-primary` uses `--text-primary`.

* `bg-brand-black` uses `--bg-primary`.

If `--text-primary` swapped, then the class `light-mode` **IS** present.
So why is `--bg-primary` still resolving to black?

**Checking** **`index.css`**:

```css
html.light-mode {
  --bg-primary: 250 250 250;
  ...
}
```

This looks correct.

**Checking** **`tailwind.config.js`**:

```javascript
black: 'rgb(var(--bg-primary) / <alpha-value>)',
```

This also looks correct.

**The "Overlay" Suspect**:
In `Hero.tsx`:

```tsx
{/* Gradient Fade at Bottom */}
<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-black to-transparent z-20 transition-colors duration-700"></div>
```

This uses `from-brand-black`. If `brand-black` is white, this fades from white to transparent. That's fine.

**The "Parallax" Suspect**:

```tsx
{/* Layer 1: Deep Atmosphere */}
<div className="parallax-layer absolute inset-0" data-speed="-0.5">
   <div className="absolute inset-0 bg-radial-fade transition-opacity duration-700 opacity-30"></div>
   ...
</div>
```

`bg-radial-fade` is defined in `tailwind.config.js`:

```javascript
'radial-fade': 'radial-gradient(circle at center, rgba(var(--accent-color), 0.05) 0%, transparent 70%)',
```

This uses `accent-color`.

**Wait, I see it.**
In `Hero.tsx`, line 225:

```tsx
className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black perspective-container transition-colors duration-500 text-center"
```

It uses `bg-brand-black`.

If `text-brand-primary` is dark (which it appears to be in the screenshot, or at least low contrast), then `light-mode` is active.
If `light-mode` is active, `--bg-primary` is `250 250 250`.
So `bg-brand-black` *should* be white.

**Why is it black in the screenshot?**
The screenshot shows the user is on `walt-burge-dmwpgwlkt-fair-trade-worker.vercel.app`. This is a preview deployment.
Maybe the Vercel build didn't pick up the `tailwind.config.js` changes?
Or...
**Is there a specificity issue?**
No, `html.light-mode` is high specificity for variables.

**Let's look closer at the screenshot.**
The background is PITCH BLACK.
The text "WALT.BURGE" is DARK GRAY.
This means the text color DID switch (it would be white in dark mode).
But the background color DID NOT switch.

**Why?**
Maybe `rgb(var(--bg-primary) / <alpha-value>)` is malformed?
In `index.css`: `--bg-primary: 3 3 3;` (no commas).
Tailwind `rgb()` syntax expects space-separated values if using the `/ alpha` syntax.
My `index.css` has space-separated values.
My `tailwind.config.js` has `rgb(var(--bg-primary) / <alpha-value>)`.

**Wait.**
If `bg-brand-black` is failing, maybe it's falling back to something?
Or maybe...
**Is there another style overriding it?**
The `div` has `style={{ backgroundImage: ... }}`.

```javascript
backgroundImage: `
    linear-gradient(to right, rgb(var(--border-color)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--border-color)) 1px, transparent 1px)
`,
```

This is the grid. It shouldn't cover the whole background with black.

**Let's look at** **`index.css`** **again.**

```css
body {
  background-color: rgb(var(--bg-primary));
  ...
}
```

The `body` also uses it.

**Is it possible the user's browser has cached the old CSS?**
The user says "still not exactly fixed".

**Alternative Theory**:
In `tailwind.config.js`, I defined `colors.brand.black`.
Does Tailwind have a default `colors.black`? Yes.
Did I override it? No, I extended it under `brand`.
So `bg-brand-black` is the custom one.

**Is it possible that** **`var(--bg-primary)`** **is defined on** **`:root`** **but** **`html.light-mode`** **isn't overriding it correctly?**
`html.light-mode` should override `:root`.

**Let's try a more direct approach.**
Instead of relying on the variable swap for the *name* `brand-black`, let's make `brand-black` ALWAYS black, and introduce a semantic class `bg-brand-page` or `bg-brand-base` that switches.
Using `bg-brand-black` implies "Black Background". If I make it white in light mode, the name is confusing.
However, I already committed to this path.

**Wait, I might have missed something simple.**
In `Hero.tsx`:

```tsx
className="... bg-brand-black ..."
```

If I inspect the element in my mind...
If `light-mode` is on:
`--bg-primary` = `250 250 250`.
`bg-brand-black` = `rgb(250 250 250)`.
It *should* be white.

**Maybe the screenshot is misleading?**
The screenshot shows "WALT.BURGE" in dark text. The background is black.
This is the definition of "Low Contrast" / "Broken".
It means Text Switched, Background Didn't.

**Why would Background NOT switch?**

1. Variable invalid? `250 250 250` is valid.
2. Tailwind config not updated?

**Let's try a different strategy to guarantee the fix.**
I will create a specific utility class `bg-theme-base` in `index.css` that handles this explicitly, bypassing Tailwind's color complexity for the main background.
Or better, I will explicitly set `bg-white` in `light-mode` using a tailwind variant, e.g. `dark:bg-brand-black light:bg-white`? No, I removed `darkMode: 'class'` usage in favor of variables.

**Wait,** **`darkMode: 'class'`** **is in** **`tailwind.config.js`.**

```javascript
darkMode: 'class',
```

This means I *can* use `dark:` modifiers.
The `light-mode` class is applied to `html`.
Tailwind expects `dark` class for dark mode.
I am toggling `light-mode`.
If I want to use `dark:` modifiers, I usually toggle `dark` class.
But I am doing the *inverse*. I am defaulting to dark and toggling `light-mode`.
So `dark:` modifiers won't work unless I swap the logic.

**But I'm using CSS variables.**
My CSS variables depend on `html.light-mode`.
This *should* work independent of Tailwind's `dark` mode logic.

**Let's check** **`App.tsx`** **again.**

```tsx
if (isLightMode) {
  root.classList.add('light-mode');
  root.style.colorScheme = 'light';
}
```

This adds the class.

**Maybe the issue is the RGB syntax in Tailwind.**
`rgb(var(--bg-primary) / <alpha-value>)`
If `--bg-primary` is `250 250 250`, this becomes `rgb(250 250 250 / 1)`. This is valid CSS Level 4.
Older browsers might choke? No, modern Vercel + React.

**Let's look at the** **`index.css`** **file content again.**

```css
:root {
  --bg-primary: 3 3 3;
}
html.light-mode {
  --bg-primary: 250 250 250;
}
```

**Wait!**
In the screenshot, there is a blue button "SYSTEM ONLINE" with text "System Online".
In `Hero.tsx`:

```tsx
<div className="... bg-brand-accent/5 text-brand-accent ...">
```

`brand-accent` maps to `--accent-color`.
In light mode, `--accent-color` is `#0891b2` (Dark Cyan).
In dark mode, it is `#22d3ee` (Light Cyan).
The screenshot shows a *darker* cyan.
So the variables *are* updating!

**If** **`bg-primary`** **is updating, why is the background black?**
Maybe there is another element ON TOP of the background?
`parallaxRef`?

```tsx
<div ref={parallaxRef} ...>
   <div className="parallax-layer ...">
      <div className="absolute inset-0 bg-radial-fade ... opacity-30"></div>
   </div>
</div>
```

`bg-radial-fade` uses `accent-color`.
`opacity-30`.
This shouldn't make it pitch black.

**What about the Canvas?**

```tsx
<canvas ... className={`... ${isLightMode ? '' : 'mix-blend-screen'}`} />
```

The canvas fills the screen.
In `Hero.tsx`:

```javascript
const draw = () => {
  ctx.clearRect(0, 0, width, height);
  // ...
  const computedStyle = getComputedStyle(document.body);
  const isLight = document.documentElement.classList.contains('light-mode');
  
  const particleColor = isLight ? 'rgba(0, 0, 0, 0.7)' : 'rgba(34, 211, 238, 0.6)';
  // ...
  ctx.fillStyle = particleColor;
  // ... draws dots
}
```

The canvas uses `clearRect`, so it's transparent. It shouldn't block the background.

**Wait.**
In `Hero.tsx` line 225:
`bg-brand-black`

If `var(--bg-primary)` is `250 250 250`, `bg-brand-black` is white.

**Is it possible the user is seeing a cached version of** **`index.css`?**
This is highly likely with Vercel deployments if the hash doesn't change or if the browser aggressively caches.
BUT, the user says "still not exactly fixed". And the text color *did* change.

**Let's assume the CSS Variable for** **`bg-primary`** **is NOT taking effect for some reason.**
Maybe the `html` selector isn't specific enough?
Or maybe `bg-brand-black` is being overridden by something else?

**Let's look at** **`index.css`** **line 32:**

```css
body {
  background-color: rgb(var(--bg-primary));
  ...
}
```

If `Hero` has `bg-brand-black`, it sits on top of `body`.

**I will try a "Nuclear Option" for the fix.**

1. Rename `bg-brand-black` to `bg-brand-page` (semantic naming).
2. Define `.bg-brand-page` explicitly in `index.css` using the variable, to ensure Tailwind isn't doing something weird with the RGB syntax.
3. OR, just use `bg-[color:var(--bg-primary)]` in Tailwind to force it.

**Actually, there's a simpler explanation.**
In `tailwind.config.js`:

```javascript
black: 'rgb(var(--bg-primary) / <alpha-value>)',
```

Is it possible that `<alpha-value>` is messing things up if not provided?
Usually Tailwind handles this.

**Let's try to verify if** **`3 3 3`** **is being read as** **`333`?** No.

**Plan:**

1. **Semantic Class**: Replace `bg-brand-black` in `Hero.tsx`, `App.tsx`, `Projects.tsx` with a new utility class `bg-theme-page` (or just rely on `bg-brand-black` but redefine it).
2. **Explicit CSS Override**: In `index.css`, force `.bg-brand-black` to use the variable directly, bypassing Tailwind's complex color function if needed.

   ```css
   .bg-brand-black {
     background-color: rgb(var(--bg-primary));
   }
   ```
3. **Check** **`Hero.tsx`** **overlays**: Ensure no other `div` has a hardcoded black background.

   * I checked. They seem fine.
4. **Force** **`light-mode`** **class on body**: Apply the class to `body` as well, just in case.

**Wait, I see a potential issue in** **`Hero.tsx`** **line 228 (Grid)**:

```javascript
backgroundImage: `
    linear-gradient(to right, rgb(var(--border-color)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--border-color)) 1px, transparent 1px)
`,
```

`rgb(var(--border-color))`
If `--border-color` is `229 229 229` (light gray), this draws light gray lines.
The background of this div is transparent.
It sits on top of the main `bg-brand-black` container.
So this is fine.

**Proposed Solution**:
The most robust fix is to **stop lying to Tailwind**.
`brand.black` should be BLACK.
`brand.white` should be WHITE.
I should create a `brand.page` or `brand.background` color that swaps.
Mapping `brand.black` to White in light mode is confusing and might be causing issues if Tailwind or other plugins rely on "black" being dark.

**Refactor Plan:**

1. **Update** **`tailwind.config.js`**:

   * Add `brand.page`: `rgb(var(--bg-primary) / <alpha-value>)`.

   * Add `brand.contrast`: `rgb(var(--text-primary) / <alpha-value>)`.

   * Restore `brand.black` to `#030303` (fixed dark).
2. **Update Components**:

   * Replace `bg-brand-black` with `bg-brand-page`.

   * Replace `text-brand-primary` with `text-brand-contrast` (or keep `primary` if it maps to text color).
3. **Update** **`index.css`**:

   * Ensure variables are robust.

**Actually, I can just update** **`brand.black`** **to** **`brand.base`** **in the config and component.**
This ensures I'm touching the files and forcing a rebuild/refresh.

**Let's do this:**

1. Modify `tailwind.config.js`: Change `black` to `base` (representing the base background).
2. Modify `index.css`: Ensure `html.light-mode` is definitely working.
3. Modify `Hero.tsx`: Change `bg-brand-black` to `bg-brand-base`.
4. Modify `App.tsx`: Change `bg-brand-black` to `bg-brand-base`.
5. Modify `Projects.tsx`: Change `bg-brand-black` to `bg-brand-base`.

This renaming strategy forces us to find every instance of the "background color" and ensures it's using the variable-backed version.

**One more check**:
In `Hero.tsx`:

```tsx
<div className="... bg-brand-black/20 backdrop-blur-sm ...">
```

If `brand-black` becomes white, `white/20` is a light frost. That's correct.

**Let's proceed with renaming** **`brand.black`** **to** **`brand.base`** **(variable backed) and adding a static** **`brand.dark`** **(fixed black).**
Actually `brand.dark` already exists in config.

**Config:**

```javascript
brand: {
  black: 'rgb(var(--bg-primary) / <alpha-value>)', // Rename to 'base'
  dark: 'rgb(var(--bg-secondary) / <alpha-value>)',
  ...
}
```

I will rename `black` to `base` in `tailwind.config.js` and all usages.
This guarantees that I catch all hardcoded instances and forces a fresh perspective on the styling.

**Files to touch**:

1. `tailwind.config.js`
2. `Hero.tsx`
3. `App.tsx`
4. `Projects.tsx`
5. `Contact.tsx`
6. `Navbar.tsx` (it was embedded in App.tsx in my previous read, but I should check if it exists as a separate file. The read failed, so it's in `App.tsx` or I need to find it. Wait, `App.tsx` imports `Navbar` from `./components/Navbar`. The read failed. I should double check the file list. Ah, I might have just missed it or it's a new file I didn't create? No, I imported it. `import { Navbar } from './components/Navbar';`. I should create it if it's missing, but the previous `App.tsx` code *defined* `Navbar` inside it? No, looking at `App.tsx` read result...
   Line 15: `const Navbar: React.FC<NavbarProps> = ...`
   Yes, `Navbar` is defined **inside** `App.tsx` in the current version I wrote.
   So I just need to edit `App.tsx`.

**Wait,** **`Projects.tsx`** **also uses** **`bg-brand-black`.**

**Plan:**

1. Rename `brand.black` -> `brand.base` in `tailwind.config.js`.
2. Search & Replace `bg-brand-black` -> `bg-brand-base` in all files.
3. Search & Replace `text-brand-black` -> `text-brand-base` in all files.
4. Search & Replace `from-brand-black` -> `from-brand-base` in all files.
5. Search & Replace `via-brand-black` -> `via-brand-base` in all files.
6. Search & Replace `to-brand-black` -> `to-brand-base` in all files.
7. Verify `index.css` colors are correct.

