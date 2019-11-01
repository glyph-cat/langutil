const VALUES = {
  // Pixels
  footerHeight: 300,
  docsidebarContainerPadding: 16,
  navbarHeight: 54,
  compactWidthThreshold: 800,
  v240DeprecatedRemovalDate: new Date('2020/03/01'),
  DERIVED: {
    reactKawaiiLarge: () => window.innerHeight / 3,
  }
}

export default VALUES
