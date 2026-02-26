import ast
import os
import sys

def extract_py_details(directory):
    output = []
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root or '.git' in root or '.emergent' in root:
            continue
        for file in files:
            if file.endswith('.py') and file not in ['extract_py.py']:
                path = os.path.join(root, file)
                rel_path = os.path.relpath(path, directory).replace('\\', '/')
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    module = ast.parse(content)
                    for node in ast.walk(module):
                        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
                            start = node.lineno
                            end = node.end_lineno
                            type_name = "Class" if isinstance(node, ast.ClassDef) else "Function"
                            output.append(f"| {rel_path} | {type_name} | {node.name} | {start} | {end} |")
                except Exception as e:
                    pass
    return output

if __name__ == "__main__":
    details = extract_py_details('.')
    with open('code_details.md', 'a') as f:
        if details:
            f.write("\n".join(details))
            f.write("\n")
