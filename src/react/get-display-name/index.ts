export function getDisplayName(
  WrappedComponent: React.ComponentType<unknown>
): string {
  return WrappedComponent.displayName || WrappedComponent.name
}
