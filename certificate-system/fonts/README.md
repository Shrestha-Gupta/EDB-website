# Fonts Directory

Place your custom TrueType font files (.ttf) here.

## Recommended Fonts

- **Elegant:** Playfair Display, Cinzel, Cormorant
- **Professional:** Roboto, Open Sans, Lato
- **Classic:** Times New Roman, Georgia

## Usage

1. Download your chosen .ttf font file
2. Place it in this directory
3. Update `font_path` in `certificate_sender.py`:

```python
self.font_path = 'fonts/YourFont.ttf'
```

## Free Font Sources

- [Google Fonts](https://fonts.google.com/)
- [Font Squirrel](https://www.fontsquirrel.com/)
- [DaFont](https://www.dafont.com/)

## Default Behavior

If no custom font is found, the system will use the default PIL font.
