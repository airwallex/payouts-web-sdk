module.exports = {
    entryPoints: ['src/index.ts'],
    entryPointStrategy: 'Expand',
    tsconfig: 'tsconfig.json',
    out: './docs/source/sdk-reference',
    excludePrivate: true,
    excludeProtected: true,
    excludeExternals: true,
    includeVersion: true,
    readme: 'README.md',
    name: 'payouts=web-sdk',
    categorizeByGroup: true,
    mergeModulesRenameDefaults: true,
    allReflectionsHaveOwnDocument: true,
    categoryOrder: ['modules', 'functions', 'interfaces', 'types'],
    mergeModulesMergeMode: 'off',
    hideBreadcrumbs: 'true',
    externalSymbolLinkMappings: {
      // used by {@link !Promise}
      global: {
        Promise: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
      },
      // used by type Foo = Promise<string>
      typescript: {
        Promise: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
      },
    },
    pretty: true,
  };
  