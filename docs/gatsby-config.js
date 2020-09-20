module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        root: __dirname,
        siteName: 'CodersBoard Docs',
        description: 'Best practices for everyone who wants to develop CodersBoard',
        githubRepo: 'CodersCrew/coders-board',
        sidebarCategories: {
          null: ['index', 'intro/initial-setup', 'intro/technologies'],
          Client: ['client/structure'],
          Server: ['server/structure'],
        },
      },
    },
  ],
};
