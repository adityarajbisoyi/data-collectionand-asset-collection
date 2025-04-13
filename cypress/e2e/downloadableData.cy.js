import Papa from 'papaparse';

describe('Extract Data from Links', () => {
  it('should extract information from each link and save formatted data', () => {
    cy.readFile('cypress/fixtures/data.csv').then((csvContent) => {
      const rows = Papa.parse(csvContent, { header: true }).data;

      rows.forEach((row, index) => {
        const pageUrl = row.link;
        const outputFile = 'cypress/downloads/output.csv';
        const formattedPairs = [];

        cy.visit(pageUrl);

        cy.get('div.list p').each(($p) => {
          const strongText = $p.find('strong').text().trim();
          const anchorText = $p.find('a').text().trim();
          if (strongText && anchorText) {
            formattedPairs.push(`${strongText} "${anchorText}"`);
          }
        }).then(() => {
          const finalFormatted = `{${formattedPairs.join(',')}}`;
          const outputLine = `${index + 1},${finalFormatted}\n`;

          cy.writeFile(outputFile, outputLine, { flag: 'a+' });
        });
      });
    });
  });
});
