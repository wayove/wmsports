<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title><?php echo isset($page_title) ? $page_title : 'WM Sports — Beyond the Obvious'; ?></title>
<link rel="icon" href="/media/fav/favicon.ico" sizes="any" />
<link rel="icon" href="/media/fav/favicon-32x32.png" type="image/png" sizes="32x32" />
<link rel="apple-touch-icon" href="/media/fav/apple-touch-icon.png" />
<link rel="stylesheet" href="/css/styles.css" />

</head>
<body>

<!-- ── HEADER ── -->
<header id="site-header">
  <a href="/" class="logo"><img src="/media/logo.png" alt="WM Sports" /></a>
  <nav class="desktop-nav">
    <a href="/#about-intro">Who We Are</a>
    <a href="/#what-we-do">What We Do</a>
    <a href="/#how-we-win">How We Win</a>
    <a href="/#contact">Get in Touch</a>
  </nav>
  <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</header>

<nav class="mobile-nav" id="mobile-nav" aria-hidden="true">
  <a href="/#about-intro" class="nav-link">Who We Are</a>
  <a href="/#what-we-do"  class="nav-link">What We Do</a>
  <a href="/#how-we-win"  class="nav-link">How We Win</a>
  <a href="/#contact"     class="nav-link">Get in Touch</a>
</nav>
