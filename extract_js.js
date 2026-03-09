const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const IGNORE_DIRS = ['node_modules', '.git', 'build', 'dist', 'coverage', '.emergent'];

function walkSync(dir, filelist = []) {
    fs.readdirSync(dir).forEach(file => {
        const dirFile = path.join(dir, file);
        if (!fs.existsSync(dirFile)) return;
        try {
            if (fs.statSync(dirFile).isDirectory()) {
                if (!IGNORE_DIRS.includes(file)) {
                    filelist = walkSync(dirFile, filelist);
                }
            } else {
                if (/\.(js|jsx|ts|tsx)$/.test(file)) {
                    filelist.push(dirFile);
                }
            }
        } catch (err) {
            console.error(err);
        }
    });
    return filelist;
}

const projectRoot = process.cwd();
const files = walkSync('.');
const results = [];
results.push("| File | Block Type | Element Name | Start Line | End Line |");
results.push("|---|---|---|---|---|");

files.forEach(file => {
    const code = fs.readFileSync(file, 'utf-8');
    const relativeFile = path.relative(projectRoot, file).replace(/\\/g, '/');
    try {
        const ast = parser.parse(code, {
            sourceType: "module",
            plugins: ["jsx", "typescript", "classProperties", "decorators-legacy"]
        });

        traverse(ast, {
            FunctionDeclaration(p) {
                if (p.node.id) {
                    results.push(`| ${relativeFile} | Function | ${p.node.id.name} | ${p.node.loc.start.line} | ${p.node.loc.end.line} |`);
                }
            },
            ArrowFunctionExpression(p) {
                if (p.parentPath.isVariableDeclarator() && p.parentPath.node.id && p.parentPath.node.id.name) {
                    results.push(`| ${relativeFile} | ArrowFunction | ${p.parentPath.node.id.name} | ${p.node.loc.start.line} | ${p.node.loc.end.line} |`);
                }
            },
            FunctionExpression(p) {
                if (p.node.id) {
                    results.push(`| ${relativeFile} | FunctionExpression | ${p.node.id.name} | ${p.node.loc.start.line} | ${p.node.loc.end.line} |`);
                } else if (p.parentPath.isVariableDeclarator() && p.parentPath.node.id && p.parentPath.node.id.name) {
                    results.push(`| ${relativeFile} | FunctionExpression | ${p.parentPath.node.id.name} | ${p.node.loc.start.line} | ${p.node.loc.end.line} |`);
                }
            },
            ClassDeclaration(p) {
                if (p.node.id) {
                    results.push(`| ${relativeFile} | Class | ${p.node.id.name} | ${p.node.loc.start.line} | ${p.node.loc.end.line} |`);
                }
            },
            ClassMethod(p) {
                if (p.node.key && p.node.key.name) {
                    results.push(`| ${relativeFile} | ClassMethod | ${p.node.key.name} | ${p.node.loc.start.line} | ${p.node.loc.end.line} |`);
                }
            },
            JSXElement(p) {
                let name = "Unknown";
                if (p.node.openingElement.name.name) {
                    name = p.node.openingElement.name.name;
                } else if (p.node.openingElement.name.property) {
                    name = p.node.openingElement.name.object.name + "." + p.node.openingElement.name.property.name;
                }
                results.push(`| ${relativeFile} | JSXElement | ${name} | ${p.node.loc.start.line} | ${p.node.loc.end.line} |`);
            }
        });
    } catch (e) {
    }
});

fs.writeFileSync('code_details.md', results.join('\n') + '\n');
