
$files = Get-ChildItem -Path "c:\Users\Admin\Desktop\BarLawWebsite" -Recurse -Filter *.html

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Replace broken arrow with Bootstrap Icon
    if ($content.Contains("â†’")) {
        $content = $content.Replace("â†’", '<i class="bi bi-arrow-right"></i>')
        Write-Host "  Replaced arrows."
    }

    # Replace broken Em Dash
    if ($content.Contains("â€”")) {
        $content = $content.Replace("â€”", "—")
        Write-Host "  Replaced em-dashes."
    }

    # Replace broken Apostrophe
    if ($content.Contains("â€™")) {
        $content = $content.Replace("â€™", "'")
        Write-Host "  Replaced apostrophes."
    }

    # Replace broken Copyright
    if ($content.Contains("Â©")) {
        $content = $content.Replace("Â©", "©")
        Write-Host "  Replaced copyright symbols."
    }
    
    # Replace broken Bullet in CSS or text
    if ($content.Contains("â€¢")) {
        # If it's in CSS content property, we might prefer \2022, but let's try literal first or just leave if it's standard bullet
        # The user's issue was mostly strange language.
        $content = $content.Replace("â€¢", "•")
        Write-Host "  Replaced bullets."
    }

    # Replace broken Double Quotes (Open)
    if ($content.Contains("â€œ")) {
        $content = $content.Replace("â€œ", '"')
        Write-Host "  Replaced open quotes."
    }
    
    # Replace broken Double Quotes (Close) - this is tricky as it might be 'â€' with a hidden byte
    # We will try to replace 'â€' with '"' if it looks safe (e.g. at end of word)
    # But 'â€' matches the start of 'â€™' (Right Single Quote) too?
    # 'â€™' is E2 80 99. 'â€' sequence is E2 80.
    # So if we already replaced 'â€™', then 'â€' remaining might be 'â€”' (E2 80 94) or 'â€œ' (E2 80 9C) or 'â€u009d' (Right Double Quote).
    # We replaced 'â€™' and 'â€”' and 'â€œ' already.
    # So any remaining 'â€' plus 'u009d' (or whatever it shows as) are likely Right Double Quotes.
    # In Windows-1252, 'â' is E2, '€' is 80.
    # If the file has 'â€' literally..
    # Let's skip the obscure ones to avoid corrupting data, but 'â€' is often seen.
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}
