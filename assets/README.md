# Assets Directory

This directory contains the assets used in PDF certificate generation.

## Required Files

### logo.png

- Company logo for certificates
- Should be a PNG file with transparent background
- Recommended size: 150px width (height will be auto-calculated)
- Place at: `assets/logo.png`

### signature.png

- Digital signature image for the coordinator
- Should be a PNG file with transparent background
- Recommended size: 130px width
- Place at: `assets/signature.png`

## Fallback Behavior

If these files are not found:

- **logo.png**: The company name "LinkVerse" will be displayed as text
- **signature.png**: Only the coordinator's name and title will be shown without signature image

## Adding Files

1. Place your logo file as `assets/logo.png`
2. Place your signature file as `assets/signature.png`
3. Restart the application for changes to take effect
