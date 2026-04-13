import os
import re

# Base directory
base_dir = r'c:\Users\axeld\Downloads\Uso-de-TICs\Uso-de-TICs\app'

def patch_file(abs_path, replacements):
    if not os.path.exists(abs_path):
        return False
    
    with open(abs_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for pattern, substitute in replacements:
        if isinstance(pattern, str):
            content = content.replace(pattern, substitute)
        else:
            content = re.sub(pattern, substitute, content)
    
    if content != original_content:
        with open(abs_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# --- Global Walk ---
for root, dirs, files in os.walk(base_dir):
    for file in files:
        abs_path = os.path.join(root, file)
        
        # 1. Temario Alignment (Specific fix for User Request)
        if file == 'temario.html':
            patch_file(abs_path, [
                ('class="row align-items-start"', 'class="row d-flex align-items-stretch"'),
                ('div class="card "', 'div class="card h-100"'),
                ('div class="overlay-dark bg"', 'div class="overlay-dark bg h-100"')
            ])

        # 2. Results Content (#53) - Pre-filling with placeholder based on typical course structure
        if file == 'objetivos.html':
            patch_file(abs_path, [
                ('<h1 class="mrg-btm-20 card-title">Objetivo principal</h1>', '<h1 class="mrg-btm-20 card-title">Resultados de aprendizaje</h1>')
            ])

        # 3. Logo Consolidation (#1)
        if file.endswith('.html'):
            patch_file(abs_path, [
                (re.compile(r'assets/images/logo/(?:CVA LOGOTIPO|logo-white|LOGOTIPO CVA BLANCO)\.png', re.I), 'assets/images/logo/logo.png')
            ])

        # 4. Quiz Radio conversion (#12, 15, 20, 23, 26-29, 31)
        if file in ['unidad3-4.html', 'unidad4-5.html', 'unidad4-16.html', 'unidad4-19.html', 
                   'unidad1-3.html', 'unidad1-13.html', 'unidad1-18.html', 'unidad2-10.html', 'unidad2-14.html']:
            patch_file(abs_path, [('type="checkbox"', 'type="radio"')])

        # 5. Broken Links (#24)
        if file == 'unidad1-16.html':
            patch_file(abs_path, [
                ('href="www.google.com.ar"', 'href="http://www.google.com.ar"'),
                ('www.google.com/', 'www.google.com.mx/')
            ])

# --- CSS Fixes ---
app_css_path = os.path.join(base_dir, 'assets/css/app.css')
patch_file(app_css_path, [
    (re.compile(r'\.button\s*\{.*?\}', re.DOTALL), 
     """.button {
  box-sizing: border-box;
  appearance: none;
  background-color: #ffffff;
  border: 2px solid var(--theme-color);
  border-radius: 0.6em;
  color: var(--theme-color);
  cursor: pointer;
  display: table;
  margin: 20px auto;
  padding: 1.2em 2.8em;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  transition: all 150ms ease-in-out;
}"""),
    (re.compile(r'\.button:hover\s*\{.*?\}', re.DOTALL), 
     """.button:hover {
  background-color: var(--theme-color);
  color: #ffffff;
}""")
])

print("Maintenance script execution finished.")
