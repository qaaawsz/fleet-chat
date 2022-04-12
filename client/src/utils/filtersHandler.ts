export const customChannelTeamFilter = (channels: any[]) =>
    channels.filter((channel) => channel.type === 'team')

export const customChannelMessagingFilter = (channels: any[]) =>
    channels.filter((channel) => channel.type === 'messaging')
