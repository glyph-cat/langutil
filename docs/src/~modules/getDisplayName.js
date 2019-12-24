function getDisplayName(WrappedComponent) {
  try {
    return WrappedComponent.displayName || WrappedComponent.name || 'Unknown'
  } catch (e) {
    return 'Unknown'
  }
}

export default getDisplayName
