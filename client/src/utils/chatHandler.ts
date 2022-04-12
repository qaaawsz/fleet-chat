export const getWatcherText = (watchers: any) => {
    if (!watchers) return 'No users online'
    if (watchers === 1) return '1 user online'
    return `${watchers} users online`
}
