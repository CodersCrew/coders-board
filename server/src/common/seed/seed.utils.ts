import { random, shuffle, times } from 'lodash';

// eslint-disable-next-line prettier/prettier
const departments = ['Human Resources', 'Sales', 'Social Media', 'Web Development', 'Public Relations', 'Security', 'Mobile Development', 'Finance', 'Business Contacts', 'Data Analysis'];

export const getDepartmentNames = (count: number) => {
  if (count > departments.length) {
    throw new Error(`Maximal departments count is ${departments.length}. Provided: ${count}`);
  }

  return shuffle(departments).slice(0, count);
};

const jobTitles = {
  // eslint-disable-next-line prettier/prettier
  prefix: ['Lead', 'Senior', 'Direct', 'Corporate', 'Dynamic', 'Future', 'Product', 'National', 'Regional', 'District', 'Central', 'Global', 'Relational', 'Customer', 'Investor', 'Dynamic', 'International', 'Legacy', 'Forward', 'Interactive', 'Internal', 'Human', 'Chief', 'Principal'],
  // eslint-disable-next-line prettier/prettier
  main: ['Solutions', 'Program', 'Brand', 'Security', 'Research', 'Marketing', 'Directives', 'Implementation', 'Integration', 'Functionality', 'Response', 'Paradigm', 'Tactics', 'Identity', 'Markets', 'Group', 'Resonance', 'Applications', 'Optimization', 'Operations', 'Infrastructure', 'Intranet', 'Communications', 'Web', 'Branding', 'Quality', 'Assurance', 'Impact', 'Mobility', 'Ideation', 'Data', 'Creative', 'Configuration', 'Accountability', 'Interactions', 'Factors', 'Usability', 'Metrics', 'Team'],
  // eslint-disable-next-line prettier/prettier
  suffix: ['Supervisor', 'Associate', 'Executive', 'Liason', 'Officer', 'Manager', 'Engineer', 'Specialist', 'Director', 'Coordinator', 'Administrator', 'Architect', 'Analyst', 'Designer', 'Planner', 'Synergist', 'Orchestrator', 'Technician', 'Developer', 'Producer', 'Consultant', 'Assistant', 'Facilitator', 'Agent', 'Representative', 'Strategist'],
};

export const getPositionNames = (count: number) => {
  const { prefix, main, suffix } = jobTitles;

  const [prefixCount, mainCount, suffixCount] = [prefix.length - 1, main.length - 1, suffix.length - 1];

  return times(count, () => `${prefix[random(prefixCount)]} ${main[random(mainCount)]} ${suffix[random(suffixCount)]}`);
};
