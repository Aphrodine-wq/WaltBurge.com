I will implement a "Mobile-First" overhaul across the entire application, focusing on touch ergonomics, performance optimization, and vertical rhythm.

### 1. **Core Navigation (App.tsx)**
- **Enhanced Mobile Menu:** Upgrade the mobile menu from a simple overlay to a **glassmorphism slide-in drawer** with staggered entry animations for menu items.
- **Touch Targets:** Increase hit areas for the hamburger menu and all interactive elements to meet the 44px minimum standard.

### 2. **Hero Section (Hero.tsx)**
- **Performance:** Dynamically reduce the particle count on mobile devices to save battery and improve frame rates.
- **Typography:** Adjust the main `H1` to `text-5xl` with tighter leading for better mobile impact without wrapping issues.
- **Parallax:** Disable mouse-based parallax on touch devices to prevent layout jank, replacing it with a subtle gyroscope effect or static composition.

### 3. **Projects Grid (Projects.tsx)**
- **Card Optimization:** Reduce project card height from `450px` to `380px` on mobile to allow users to see more context per scroll.
- **Touch Interaction:** Ensure the "hover" effects (which show tech stacks) are accessible via a single tap on mobile, or make them always visible in a simplified format.

### 4. **Contact & Skills (Contact.tsx, Skills.tsx)**
- **Vertical Rhythm:** Reduce large gaps (`gap-16` -> `gap-10`) in the Contact section to keep information dense on smaller screens.
- **Compact Layout:** Tighten the padding on Skill cards for mobile to maximize screen real estate.

### 5. **Git Sync**
- Once verified, I will sync all changes to the repository.