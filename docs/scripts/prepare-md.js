/**
step1:
        - get all the files in the file_dir recursively
        - loop the files and get the file name as file_name
        - combine a string value and add the first line of the file, the rule is:
`---
title: ${file_name} //(split by _ or - and join by space, if camel case, convert to space


step2: 
        - remove the following string pattern '#### Defined in' and the following 2 lines,
 */
const path = require('path');
const fs = require('fs');
const gatsbyConfig = require('../gatsby-config');

const caseConvert = false;
const folder = path.join(__dirname, '..', '/source');
const ingestDataPath = path.join(__dirname, '..', '/source/ingestData.json');
function processFiles(fileDir) {
  // Get all files in the directory
  const files = getAllFiles(fileDir);
  const ingestData = [];
  if (fs.existsSync(ingestDataPath)) {
    fs.unlink(ingestDataPath, (error) => {
      if (error) {
        console.error('Error deleting file:', error);
      } else {
        console.log('File deleted successfully.');
      }
    });
  }

  // Loop through the files
  for (const file of files) {
    // Read the file contents
    let contents = fs.readFileSync(file, 'utf8');
    if (!file.includes('.md')) {
      continue;
    }
    // Get the file name and convert it to title case
    const fileName = path.basename(file, '.md');
    const title = caseConvert ? toTitleCase(fileName) : fileName;

    // Add the title to the beginning of the file
    if (!contents.startsWith('---') && title !== 'README') {
      contents = `---\ntitle: ${title}\ndescription: ${title}\n---\n\n${contents}`;
    } else if (!contents.startsWith('---')&& title === 'README') {
      contents = `---\ntitle: Technical overview\ndescription: Technical overview\n---\n\n${contents}`;
    }
    contents = contents.replace(/#### Defined in\n\n(.*)\.ts\:[0-9]+\n/g, '');

    if (!file.includes('README.md')) {
      const sections = contents.split(/\n(?=## |### )/);
      sections.forEach((sectionContent) => {
        const sectionTitle = sectionContent?.match(/^(#)*(\s)*(.+)/m)?.[3];
        ingestData.push({
          sdk_name: gatsbyConfig.plugins[0].options.pageTitle,
          page_title: toTitleCase(fileName.replace(/.md(x)?/, '')),
          page_description: contents?.match(/description:\s*(.*?)\n/)?.[1],
          section_title: sectionTitle,
          contents: sectionContent,
          path: `${gatsbyConfig.pathPrefix}${file
            .replace(/(.)*\/docs\/source/g, '')
            .replace(/.md(x)?/, '')}${
            sectionTitle ? `#${toLinkCase(sectionTitle)}` : ''
          }`,
        });
      });
    }

    // Write the new contents to the file
    fs.writeFileSync(file, contents, 'utf8');
    // Generate the data ingestion file
    fs.writeFileSync(ingestDataPath, JSON.stringify(ingestData));
  }
}

function getAllFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const itemPath = path.join(dir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      // Recursively get files from the subdirectory
      files = files.concat(getAllFiles(itemPath));
    } else {
      // Add the file to the list
      files.push(itemPath);
    }
  }
  return files;
}

function toTitleCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // add space between camel case words
    .replace(/[-_]/g, ' ') // replace hyphens and underscores with spaces
    .replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    }); // convert first letter of each word to uppercase
}

function toLinkCase(str) {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, '') // remove special character
    .replace(/(\s)+/g, '-') // replace hyphens and underscores with spaces
    .toLowerCase();
}

processFiles(folder, caseConvert);
