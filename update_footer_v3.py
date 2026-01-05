import os
import re

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Update CSS versions
    # For index.html (css/...)
    content = re.sub(r'href="css/([^"]+)\.css"', r'href="css/\1.css?v=3"', content)
    content = re.sub(r'href="css/([^"]+)\.css\?v=\d+"', r'href="css/\1.css?v=3"', content)
    
    # For pages (../css/...)
    content = re.sub(r'href="\.\./css/([^"]+)\.css"', r'href="../css/\1.css?v=3"', content)
    content = re.sub(r'href="\.\./css/([^"]+)\.css\?v=\d+"', r'href="../css/\1.css?v=3"', content)

    # Convert footer h4 to h6
    # We'll use a regex that matches the footer section and only replaces within it
    footer_match = re.search(r'(<footer_class="footer">.*?</footer>)', content, re.DOTALL) # Simple regex might fail if attributes differ
    # Better: finding the footer block by strict string matching if possible, or just replace all h4s if they are only in footer?
    # Inspecting files: h4 is used in body too (e.g. contact form). Must be careful.
    
    # Let's target the specific known footer structure or use a robust method.
    # The footer starts with <footer class="footer">
    
    parts = content.split('<footer class="footer">')
    if len(parts) > 1:
        pre_footer = parts[0]
        footer_content = parts[1]
        
        # Replace h4 in footer content
        footer_content = footer_content.replace('<h4>', '<h6>')
        footer_content = footer_content.replace('</h4>', '</h6>')
        
        content = pre_footer + '<footer class="footer">' + footer_content
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes for {filepath}")

# Update index.html
update_file(r'c:\Users\Admin\Desktop\BarLawWebsite\index.html')

# Update pages
pages_dir = r'c:\Users\Admin\Desktop\BarLawWebsite\pages'
for filename in os.listdir(pages_dir):
    if filename.endswith('.html'):
        update_file(os.path.join(pages_dir, filename))
