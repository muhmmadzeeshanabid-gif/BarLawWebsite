import os
import re

# Read index.html
try:
    with open('index.html', 'r', encoding='utf-8') as f:
        index_content = f.read()
except FileNotFoundError:
    print("Error: index.html not found in current directory.")
    exit(1)

# Extract Navbar
nav_pattern = re.compile(r'(<nav class="main-navbar.*?</nav>)', re.DOTALL)
match = nav_pattern.search(index_content)
if not match:
    print("Navbar not found in index.html")
    exit(1)

navbar_html = match.group(1)

# Adjust for subdirectory
# "index.html" -> "../index.html"
# "pages/" -> ""
navbar_sub = navbar_html.replace('href="index.html"', 'href="../index.html"')
navbar_sub = navbar_sub.replace('href="pages/', 'href="')

pages_dir = 'pages'
if not os.path.exists(pages_dir):
     print(f"Pages directory '{pages_dir}' not found.")
     exit(1)

for filename in os.listdir(pages_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(pages_dir, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace Navbar
            # We use re.sub but need to be careful with formatting. 
            # The regex finds the existing block.
            if nav_pattern.search(content):
                new_content = nav_pattern.sub(lambda m: navbar_sub, content)
            else:
                print(f"Warning: No navbar found in {filename}, skipping navbar update.")
                new_content = content
            
            # Add Zoom CSS if missing
            if 'href="../css/style.css"' not in new_content and 'href="css/style.css"' not in new_content:
                 if '</head>' in new_content:
                     new_content = new_content.replace('</head>', '  <link rel="stylesheet" href="../css/style.css" />\n</head>')
                 else:
                     print(f"Warning: No </head> tag in {filename}")
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
            
        except Exception as e:
            print(f"Error processing {filename}: {e}")
