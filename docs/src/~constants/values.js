const VALUES = {
  // Pixels
  docsidebarContainerPadding: 16,
  navbarHeight: 54,
  compactWidthThreshold: 800,
  v240DeprecatedRemovalDate: new Date('2020/03/01'),
  fabSize: 64,
  fabPadding: 16,
  DERIVED: {
    footerHeight: () => window.innerWidth < 800 ? 400 : 200,
    reactKawaiiLarge: () => window.innerHeight / 3,
  }
}

export default VALUES
