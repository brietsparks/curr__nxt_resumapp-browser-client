const { mockProjects, mockContributions, mockSkills } = require('./data');
const { find, filter, includes } = require('lodash');

const resolvers = {
  Query: {
    history: (root, { userId }) => filter(mockProjects, p => p.userId === userId)
  },

  Project: {
    contributions: project => filter(mockContributions, c => c.parentId === project.id)
  },

  Contribution: {
    skills: contribution => filter(mockSkills, s => includes(contribution.skillIds, s.id))
  }
};

module.exports = {
  resolvers
};