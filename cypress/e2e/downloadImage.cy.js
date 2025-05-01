import Papa from 'papaparse';

describe('Download Image from Each Link', () => {
  it('should download the .demo-trigger image from each page', () => {
    cy.readFile('cypress/fixtures/data.csv').then((csvContent) => {
      const rows = Papa.parse(csvContent, { header: true }).data;

      rows.forEach((row) => {
        const pageUrl = row.link;
        const num = row["#"]

        cy.visit(pageUrl);

        cy.get('.demo-trigger')
          .invoke('attr', 'src')
          .then((imgUrl) => {
            // Download the image using a task
            const filename = `${num}.jpg`;
            cy.task('downloadImage', { url: imgUrl, filename });
          });
      });
    });
  });
});
