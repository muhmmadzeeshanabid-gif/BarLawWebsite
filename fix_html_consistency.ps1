$files = Get-ChildItem -Path "c:\Users\Admin\Desktop\BarLawWebsite" -Recurse -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    $originalContent = $content

    # 1. Normalize Navbar Icons (remove newlines in <i> tags)
    # Target: <i [newlines] class="..."></i> -> <i class="..."></i>
    # PowerShell regex can handle multiline
    $content = $content -replace '(?ms)<i\s+class="([^"]+)"\s*></i>', '<i class="$1"></i>'

    # 2. Update Footer Headers (h4 -> h6)
    # Split by footer class to avoid changing non-footer h4s
    if ($content -match '(?ms)<footer class="footer">') {
        # Split into pre-footer and footer (and post-footer implied)
        # We assume one footer per page
        $parts = $content -split '(?ms)(<footer class="footer">)', 2
        
        # parts[0] is pre-footer
        # parts[1] is the tag itself + rest of file
        # We need to be careful. -split captures delimiters if in ()
        
        # easier approach: replace h4 in the footer match
        $footerMatch = [regex]::Match($content, '(?ms)(<footer class="footer">.*?</footer>)')
        if ($footerMatch.Success) {
            $footerBlock = $footerMatch.Value
            $newFooterBlock = $footerBlock -replace '<h4>', '<h6>'
            $newFooterBlock = $newFooterBlock -replace '</h4>', '</h6>'
            
            # replace in content
            $content = $content.Replace($footerBlock, $newFooterBlock)
        }
    }

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
    else {
        Write-Host "No changes for $($file.Name)"
    }
}
