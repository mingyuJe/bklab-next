# BK Lab Member Photo Guide

## Recommended photo sizes

- Principal Investigators: portrait crop, 4:5 ratio, at least 1200 × 1500 px
- Students: portrait crop, 4:5 ratio, at least 900 × 1125 px
- Alumni: photo optional. The page uses compact rows by default.

## File locations

Place image files here:

```txt
public/images/members/
```

Recommended file names:

```txt
seung-hyub-baek.jpg
tae-heon-kim.jpg
min-seok-kim.jpg
min-kyu-jeong.jpg
```

Then connect each image in `data/members.json`:

```json
"photo": "/images/members/min-kyu-jeong.jpg"
```

## Visual direction

Use the same background and crop style as much as possible:

- Bright neutral wall or lab background
- Upper-body or head-and-shoulders portrait
- Leave some margin above the head
- Avoid mixed aspect ratios, screenshots, or very dark photos
- If only group photos are available, crop each person individually into 4:5


## 2026-05 layout update

PI cards now use a top-photo / bottom-information layout. This keeps both PI cards balanced and prevents office, email, and focus text from wrapping too narrowly. Keep PI photos in the same folder and path format; no data-field change is required.
