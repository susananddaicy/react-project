import SessionCache from '../data/cache/SessionCache';

class ChannelSession extends SessionCache {
  constructor() {
    const options = {
      lifeTime: '1D',
      key: 'channel_key',
    };
    super(options);
  }
}

export default ChannelSession.getInstance();
