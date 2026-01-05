import os
import re

def normalize_navbar(content):
    # Target specific messy pattern in contact.html
    # <i\n      class="fa-solid fa-scale-balanced logo-icon-premium icon-scale"\n    ></i>
    # Replace with single line: <i class="fa-solid fa-scale-balanced logo-icon-premium icon-scale"></i>
    
    pattern = r'<i\s+class="([^"]+)"\s*></i>'
    replacement = r'<i class="\1"></i>'
    
    new_content = re.sub(pattern, replacement, content)
    return new_content

def update_footer_headers(content):
    # Find footer block
    footer_match = re.search(r'(<footer class="footer">.*?</footer>)', content, re.DOTALL)
    if footer_match:
        footer_block = footer_match.group(1)
        new_footer_block = footer_block.replace('<h4>', '<h6>').replace('</h4>', '</h6>')
        # Also replace any /h4 just in case case sensitivity or spacing
        new_footer_block = re.sub(r'<\s*h4\s*>', '<h6>', new_footer_block, flags=re.IGNORECASE)
        new_footer_block = re.sub(r'<\s*/\s*h4\s*>', '</h6>', new_footer_block, flags=re.IGNORECASE)
        
        content = content.replace(footer_block, new_footer_block)
    return content

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Update Footer Headers (h4 -> h6)
    content = update_footer_headers(content)

    # 2. Special handling for contact.html navbar normalization
    if 'contact.html' in filepath:
        content = normalize_navbar(content)
        # Also fix any ../index.html formatting if needed, but the loop is the main issue.

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes for {filepath}")

# Process all html files
root_dir = r'c:\Users\Admin\Desktop\BarLawWebsite'
files_to_process = [os.path.join(root_dir, 'index.html')]

# Add pages
pages_dir = os.path.join(root_dir, 'pages')
for filename in os.listdir(pages_dir):
    if filename.endswith('.html'):
        files_to_process.append(os.path.join(pages_dir, filename))

for filepath in files_to_process:
    process_file(filepath)
