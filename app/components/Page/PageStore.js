import SessionCache from '../../data/cache/SessionCache';

class PageStore extends SessionCache {
  constructor() {
    const options = {
      lifeTime: '1D',
      key: 'page_manager_key',
    };
    super(options);
  }
}

export default PageStore.getInstance();
