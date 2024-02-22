const path = require('path');
const fs = require('fs');
const util = require('node:util');

const folder = path.join(__dirname, '..', '/source');

function generateMenuStructure(folderPath) {
  const menuStructure = {};

  function traverseDirectory(dirPath, currentMenu) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        const directoryName = file;
        const newMenu = {};
        currentMenu[directoryName] = newMenu;
        traverseDirectory(filePath, newMenu);
      } else if (stats.isFile()) {
        // const fileName = path.parse(file).name;
        const fileExtension = path.extname(file).toLowerCase();

        if (fileExtension === '.md' || fileExtension === '.mdx') {
          if (!currentMenu[null]) {
            currentMenu[null] = [];
          }
          const filePathWithoutExtension = path.join(dirPath, path.parse(file).name);
          const relativePath = path.relative(folderPath, filePathWithoutExtension);
          currentMenu[null].push(relativePath);
        }
      }
    });
  }

  traverseDirectory(folderPath, menuStructure);
  return menuStructure;
}
const menuStructure = generateMenuStructure(folder);
function generateMenu() {
  const configObj = require('../gatsby-config.js');
  configObj.plugins.map((plugin) => {
    if (plugin.resolve === '@airwallex/gatsby-theme-docs') {
      plugin.options.sidebarCategories = menuStructure;
    }
  });
  fs.writeFileSync('./gatsby-config.js', 'module.exports = ');
  // Writes the plain object to the file
  fs.appendFileSync('./gatsby-config.js', util.inspect(configObj, { showHidden: false, depth: null }));
}

generateMenu();
