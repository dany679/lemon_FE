const pointData = {
  name: "testing-point",
  nameUpdate: "testing-point-update ",
  serialID: "testing-point-serialID",
  serialIDUpdate: "testing-point-serialID-update",
};
const statesList = ["AGUARDANDO", "EM ANDAMENTO", "PLANEJAMENTO", "CONCLUIDO"];
const typeFast = [
  "energiaEletricaKwh",
  "energiaEletricaPrice",
  "energiaInjetadaKwh",
  "energiaInjetadaPrice",
  "energiaCompensadaKwh",
  "energiaCompensadaPrice",
  "contribPublic",
  "total",
];

declare namespace Cypress {
  interface Chainable {
    sendPoint(name: string, type: string): Chainable<Element>;
  }
}
describe("fees page workflow", () => {
  beforeEach(() => {
    cy.login("fees");
    cy.visit("/faturas");
  });

  it("should be show current html", () => {
    cy.contains(/Pontos de acesso/i);
    cy.cyGetTitle("Faturas");
    cy.should("contain.text", /Faturas de pagamentos/gi);
  });
  it("Should be able to search", () => {
    cy.get("input[name='name']").type("search");
    cy.getDataTest("skeleton-row-fees-1").should("exist");
    cy.getSearchString("search=search");
    cy.getSearchString("page=1");

    cy.getByNameAndClear("name").type("testing");
    cy.getDataTest("skeleton-row-point-1").should("exist");
    cy.getSearchString("search=search");
    cy.getSearchString("page=1");
    cy.getDataTest("button-clear-fees").click();
  });

  it("Should be able to create", () => {
    const random = Math.floor(Math.random() * 10000000);
    cy.getDataTest("button-new-fees-id").click();
    cy.getDataTest("skeleton-modal-fees").should("not.exist");
    cy.getDataTest("nCLient").as("nCLient").should("exist");
    const nTest = 14885;
    cy.get("@nCLient").type(`${nTest}`);
    cy.getDataTest("input-form-date").as("date").should("exist");

    cy.get("@date").trigger("mouseover");
    cy.get("@date").click();
    cy.get("@date").focused().type("0004/2022");

    typeFast.forEach((type: string) => {
      cy.getDataTest(`${type}`).as(type).should("exist");
      cy.get(`@${type}`).type(`${Math.floor(Math.random() * 10000)}`);
    });

    cy.getDataTest("form-fees-button").click();
    cy.contains(/sucesso/gi);
    cy.getDataTest("skeleton-row-fees-1").should("exist");
  });
  it.only("Should be able to receive data to edit and update", () => {
    const random = Math.floor(Math.random() * 10000000);
    cy.getDataTest("skeleton-row-fees-1").should("exist");
    cy.getDataTest("skeleton-row-fees-1").should("not.exist");
    cy.getDataTest("edit-row-0").click();

    cy.getDataTest("form-fees-button").click();
    cy.contains(/sucesso/gi);
    cy.getDataTest("skeleton-row-fees-1").should("exist");
  });
  it("Should be able to delete fees", () => {
    cy.getDataTest("skeleton-row-point-0")
      .should("not.exist")
      .then(() => {
        cy.getDataTest("row-point-0").getDataTest("delete-button").first().trigger("mouseover");
        cy.contains(/Excluir/i);
        cy.getDataTest("row-point-0").find(`[data-test="delete-button"]`).first().click();
        cy.getDataTest("button-delete-modal").should("exist").click();
      });
    cy.getDataTest("skeleton-row-point-1").should("exist");
    cy.contains(/sucesso/gi);
  });
});
