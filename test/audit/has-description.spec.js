const chai = require("chai");
const hasRepoDescription = require("../../src/audit/has-description");

describe('Audit repository has description', function () {
  describe('description is set', function () {
    it('should return a successful result', async function () {
      const mockArtefacts = {
        repository: { description: 'test description' }
      }

      const results = await hasRepoDescription.getResults(mockArtefacts);

      chai.expect(results).to.eql({ pass: true, score: 1, message: null });
    });
  });

  describe('description is not set', function () {
    it('should return a successful result', async function () {
      const mockArtefacts = {
        repository: { description: null }
      }

      const results = await hasRepoDescription.getResults(mockArtefacts);

      chai.expect(results).to.eql({
        pass: false,
        score: 0,
        message: 'No description was set'
      });
    });
  });
});
