$ErrorActionPreference = "Stop"

try {
    $indexContent = Get-Content "index.html" -Raw
} catch {
    Write-Error "index.html not found."
    exit 1
}

# Regex to find navbar. (?s) enables dotall mode in regex
if ($indexContent -match '(?s)(<nav class="main-navbar.*?</nav>)') {
    $navbarHtml = $matches[1]
    
    # Adjust links for subdirectory
    # href="index.html" -> href="../index.html"
    $navbarHtml = $navbarHtml.Replace('href="index.html"', 'href="../index.html"')
    # href="pages/" -> href=""
    $navbarHtml = $navbarHtml.Replace('href="pages/', 'href="')
    
    # Get all HTML files in pages/
    $pages = Get-ChildItem "pages/*.html"
    
    foreach ($page in $pages) {
        Write-Host "Processing $($page.Name)..."
        $content = Get-Content $page.FullName -Raw
        
        # Replace Navbar using regex
        if ($content -match '(?s)(<nav class="main-navbar.*?</nav>)') {
            # Escape $ in replacement string to avoid regex group substitution issues if any, 
            # though simple string replace via [regex]::Replace is safer or just -replace with careful string
            # We will use .NET Replace method on the string content if possible, but we need to match the block first.
            # Using -replace operator with regex is standard. Escape specific chars if needed.
            # Actually, the replacement string (navbarHtml) might contain $ (though unlikely in HTML unless JS).
            # Safer: Use string replacement if we can identify exact string, but existing navbar content varies? 
            # No, existing navbar might be old.
            # Let's use the -replace operator. The block to replace is the Match.
            $content = $content -replace '(?s)(<nav class="main-navbar.*?</nav>)', $navbarHtml
        } else {
            Write-Warning "Navbar block not found in $($page.Name)"
        }
        
        # Check for style.css link
        if ($content -notmatch 'href="\.\./css/style\.css"' -and $content -notmatch 'href="css/style\.css"') {
            $content = $content -replace '</head>', '  <link rel="stylesheet" href="../css/style.css" />
</head>'
            Write-Host "Added style.css link."
        }
        
        Set-Content $page.FullName $content -Encoding utf8
    }
    Write-Host "All pages updated."
} else {
    Write-Error "Navbar not found in index.html"
}
