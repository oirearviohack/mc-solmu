const requireAll = context => context.keys().map(context)

export const preloadIcons = () => requireAll(require.context('../../../static/icons', false, /.*\.svg$/))
