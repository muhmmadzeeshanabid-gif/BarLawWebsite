$files = Get-ChildItem -Path "c:\Users\Admin\Desktop\BarLawWebsite" -Recurse -Filter *.html

foreach ($file in $files) {
    # Read as raw bytes might be safer to detect the utf-8 sequence if it's being misread? 
    # Or just read as string. PowerShell Get-Content usually handles UTF8 nicely, 
    # but if the FILE IS SAVED as UTF8 but opened as ANSI by the browser/system, that's where mojibake happens. 
    # The grep output confirms the text ON DISK looks like "â†’" if interpreted as ANSI/Latin1 ?? 
    # Let's assume we want to replace the literals "â†’" etc with proper entities like "&rarr;"

    $content = Get-Content $file.FullName -Raw

    # Replacements
    # Arrow ->
    $content = $content -replace 'â†’', '&rarr; '
    
    # Em dash —
    $content = $content -replace 'â€”', '&mdash;'
    
    # En dash –
    $content = $content -replace 'â€“', '&ndash; '
    
    # Quotes ’ and “ ”
    $content = $content -replace 'â€™', '&rsquo;'
    $content = $content -replace 'â€œ', '&ldquo;'
    $content = $content -replace 'â€?', '&rdquo;'  # Be careful with ? matching
    
    # The grep output showed 'â€œ' and 'â€' 
    # We should be precise.
    # â€™ = ’ (Right single quote / apostrophe)
    # â€” = — (Em dash)
    # â€“ = – (En dash)
    # â†’ = → (Right arrow)
    # â€œ = “ (Left double quote)
    # â€\u009d ?? usually follows. 
    
    # Let's stick to the ones found in grep for now
    $content = $content.Replace('â†’', '&rarr; ')
    $content = $content.Replace('â€”', '&mdash;')
    $content = $content.Replace('â€“', '&ndash; ')
    $content = $content.Replace('â€™', '&rsquo; ')
    $content = $content.Replace('â€œ', '&ldquo; ')
    $content = $content.Replace('â€?', '&rdquo; ') 
    
    # Also bullet 'â€¢'
    $content = $content.Replace('â€¢', '&bull; ')

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Processed $($file.Name)"
}
