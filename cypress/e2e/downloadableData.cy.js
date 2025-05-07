import Papa from 'papaparse';

describe('Extract Data from Links', () => {
  it('should extract information from each link and append each row properly', () => {
    const outputFile = 'cypress/downloads/output.csv';
    const allKeys = new Set(["#","Common Name"]);
    
    const previousEntries = [];

    // cy.writeFile(outputFile, ''); // clear the file first

    cy.readFile('cypress/fixtures/data.csv').then((csvContent) => {
      const rows = Papa.parse(csvContent,{header:true}).data;

      rows.forEach((row) => {
        const pageUrl = row.link;
        const commonName = row["Common Name"];
        // let indexx = row["#"];
        // console.log(row);
       

        cy.visit(pageUrl);

        cy.get('div.list p').then(($ps) => {
          const entry = {"Common Name": commonName};

          $ps.each((_, p) => {
            const $p = Cypress.$(p);
            const key = $p.find('strong').text().trim().replace(/:$/, '');
            const value = $p.find('a').text().trim() || $p.text().replace($p.find('strong').text(), '').trim();

            if (key && value) {
              entry[key] = value;
              allKeys.add(key);
            }
          });
          // console.log(row["#"]);
          // entry["index"] = row["#"];

        }).then(() => {
          const keysArray = Array.from(allKeys);

          // Normalize current entry
          const normalizedEntry = {};
          keysArray.forEach(key => {
            normalizedEntry[key] = row[key] || '';
          });
          normalizedEntry["Common Name"] = row["Common Name"];

          cy.get('div.list p').each(($p) => {
            const key = $p.find('strong').text().trim().replace(/:$/, '');
            const value = $p.find('a').text().trim() || $p.text().replace($p.find('strong').text(), '').trim();
            if (key && value) {
              normalizedEntry[key] = value;
            }
          }).then(() => {
            // Write header if it's the first row
            if (previousEntries.length === 0) {
              const header = Papa.unparse([Object.fromEntries(keysArray.map(k => [k, k]))], { header: false });
              cy.writeFile(outputFile, header + '\n');
            }

            // Append current row
            const orderedEntry = {};
            keysArray.forEach(k => {
              orderedEntry[k] = normalizedEntry[k] || '';
            });

            const dataLine = Papa.unparse([orderedEntry], { header: false });
            cy.writeFile(outputFile, dataLine + '\n', { flag: 'a+' });

            previousEntries.push(orderedEntry);
          });
        });
      });
    });
  });
});
