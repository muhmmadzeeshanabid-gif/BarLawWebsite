$files = Get-ChildItem -Path "c:\Users\Admin\Desktop\BarLawWebsite" -Recurse -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Regex to find footer and replace h4 with h6 within it
    # Note: Simplistic approach. If footer is large, this might be tricky.
    # Let's try string replacement if we can identify the footer block.
    
    # 1. CSS Cache Busting
    # Replace .css" with .css?v=3" (checking if not already ?v=)
    # Actually user wants to FORCE it, so replacing any existing ?v=.. or adding one.
    $content = $content -replace 'href="([^"]+)\.css"', 'href="$1.css?v=3"'
    $content = $content -replace 'href="([^"]+)\.css\?v=[^"]+"', 'href="$1.css?v=3"'

    # 2. Footer h4 -> h6
    # We will split by <footer class="footer"> to targetedly replace
    if ($content -match '<footer class="footer">') {
        $parts = $content -split '<footer class="footer">', 2
        $preFooter = $parts[0]
        $footerPart = $parts[1]
        
        # Replace h4 tags in footer part
        $footerPart = $footerPart -replace '<h4>', '<h6>'
        $footerPart = $footerPart -replace '</h4>', '</h6>'
        
        $content = $preFooter + '<footer class="footer">' + $footerPart
    }

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated $($file.Name)"
}
