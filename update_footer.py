import os
import re

def update_footer_year(directory, target_year="2026"):
    # Pattern to match the copyright string with any 4-digit year
    # It accounts for possible variations in spacing and the trailing period.
    pattern = re.compile(r"(D\.R\.© Instituto Tecnológico y de Estudios Superiores de Monterrey, México, )\d{4}(\.?)", re.IGNORECASE)
    replacement = r"\g<1>" + target_year + r"\g<2>"

    updated_count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content, count = pattern.subn(replacement, content)
                    
                    if count > 0:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        updated_count += 1
                        print(f"Updated {file_path} ({count} replacements)")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

    print(f"\nTotal files updated: {updated_count}")

if __name__ == "__main__":
    app_dir = os.path.join(os.getcwd(), "app")
    update_footer_year(app_dir)
