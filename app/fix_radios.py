import os

base_dir = r"c:\Users\axeld\Downloads\Uso-de-TICs\Uso-de-TICs\app"

files = [
    r"html\modulo1\unidad4-16.html",
    r"html\modulo1\unidad4-19.html"
]

for rel_path in files:
    path = os.path.join(base_dir, rel_path)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace('type="checkbox"', 'type="radio"')
        content = content.replace('checkbox-inline', 'radio-inline')
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed radios for:", path)

