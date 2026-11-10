# Blender | Redesign concept (unofficial)

A modern landing page made as an exercise, for a free and open source 3D program. **This is not the official site** and it is not affiliated with the Blender Foundation. The official site is [blender.org](https://www.blender.org/).

Built with plain HTML, CSS and JavaScript, no libraries.

## What it includes

- Light and dark theme (follows the device setting, then remembers your choice)
- Layout adapted for phone, tablet and desktop
- Hero with an animated 3D illustration (tilts with the mouse)
- Six features presented with tabs and original illustrations
- Rendering demo: a samples slider and a denoise switch
- Sections about the license, the industry, resources and first steps
- The download button detects your operating system (Windows, macOS, Linux)

## Structure

- `index.html` - page structure
- `style.css` - themes, layout, animations, responsive rules
- `script.js` - tabs, rendering demo, theme, menu, animations
- `art.js` - the illustrations, drawn in SVG

## Run locally

Open `index.html` in a browser.

## Publish on GitHub Pages

1. Upload the 4 code files to a new repository (for example `blender-concept`).
2. Go to **Settings → Pages**.
3. Under **Source**, choose the `main` branch and the `/ (root)` folder.
4. After a minute the site will be at `https://USERNAME.github.io/blender-concept/`.

## Images

The illustrations are original, drawn in code, and do not use official images. To use real images:

1. Create an `images/` folder.
2. In `script.js`, fill in `FEATURE_IMAGES`, for example:
   `const FEATURE_IMAGES = { render: 'images/render.jpg', model: 'images/model.jpg' };`
3. The image replaces the illustration in that tab.

Only use images you have the right to publish, and add the attribution the license requires. Do not use the official logo in a way that suggests the page is official.

## Notes

The text about features and the license summarizes the official site as of the date this was made. For current information (versions, announcements), use the links to blender.org.
