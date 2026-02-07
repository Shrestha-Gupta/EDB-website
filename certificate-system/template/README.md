# Certificate Template

Place your certificate template image here:

**Required file:** `certificate_template.png`

## Template Guidelines

- **Format:** PNG (recommended) or JPG
- **Resolution:** 1920x1080 or higher
- **Design:** Leave space in the center for participant name
- **Colors:** Use high contrast for text visibility

## Position Adjustment

The participant's name will be centered horizontally and vertically by default.

To adjust the vertical position, edit `certificate_sender.py`:

```python
y = img.height / 2  # Adjust this value
```

Common positions:
- `img.height / 2` - Center
- `img.height * 0.45` - Slightly above center
- `img.height * 0.6` - Below center
