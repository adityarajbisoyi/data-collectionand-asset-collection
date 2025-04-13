import Papa from 'papaparse';

describe('Download Image from Each Link', () => {
  it('should download the .demo-trigger image from each page', () => {
    cy.readFile('cypress/fixtures/data.csv').then((csvContent) => {
      const rows = Papa.parse(csvContent, { header: true }).data;

      rows.forEach((row, index) => {
        const pageUrl = row.link;

        cy.visit(pageUrl);

        cy.get('.demo-trigger')
          .invoke('attr', 'src')
          .then((imgUrl) => {
            // Download the image using a task
            const filename = `${index + 1}.jpg`;
            cy.task('downloadImage', { url: imgUrl, filename });
          });
      });
    });
  });
});
