# WM Sports — PHP Site

## File Structure

```
wm-sports/
├── index.php              ← Main homepage (all sections)
├── .htaccess              ← Apache config, asset caching, security
├── favicon.png            ← ⚠️  Add this manually (copy from your root)
├── includes/
│   ├── header.php         ← <head>, nav, sticky header
│   └── footer.php         ← footer, closing scripts
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── media/
    ├── logo.png           ← ⚠️  Add manually
    ├── borderless-logo.png← ⚠️  Add manually
    └── sports_video.mp4   ← ⚠️  Add manually
```

## How to deploy on Cloudways

1. Log in to Cloudways → go to your Application
2. Open **Application Management → File Manager** (or use SFTP)
3. Navigate to `public_html/` — this is your web root
4. Upload ALL files from this folder into `public_html/`
   - Keep the folder structure exactly as above
   - Make sure `media/` contains your logo, borderless-logo, and video
   - `favicon.png` goes in `public_html/` root
5. Visit your domain — done!

## SFTP upload (faster for large video file)

- Host: your Cloudways server IP
- Port: 22
- User/Pass: from Cloudways → Application → Access Details → SFTP

## To add more pages later

Create e.g. `about.php`:

```php
<?php
$page_title = 'About — WM Sports';
include 'includes/header.php';
?>

<!-- your page content here -->

<?php include 'includes/footer.php'; ?>
```

## Enable HTTPS

Once your domain is pointed and SSL is installed via Cloudways,
uncomment the HTTPS redirect lines in `.htaccess`.
