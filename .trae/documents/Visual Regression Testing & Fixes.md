I will use the MCP Puppeteer tool to inspect the site for visual bugs and regressions following the recent redesign.

**Diagnostic Plan:**
1.  **Launch Server**: Start the local Vite development server.
2.  **Inspect with Puppeteer**:
    *   Navigate to the local instance.
    *   **Check for Layout Overflow**: Programmatically detect elements causing unwanted horizontal scrolling (a common side effect of "full-bleed" sections).
    *   **Verify Asset Loading**: Scan for broken images in the new "Projects" section.
    *   **Capture Console Errors**: Check for any React runtime errors.
3.  **Remediation**: Based on the findings, I will fix any identified layout shifts, broken assets, or runtime errors.

I will begin by launching the server and running the diagnostics.