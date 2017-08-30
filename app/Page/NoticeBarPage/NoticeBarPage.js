import React, {
    Component,
  } from 'react';
  import NoticeBar from '../../components/NoticeBar/NoticeBar.js';
  
  class NoticeBarPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    render() {
      return (
        <section>
          <NoticeBar marqueeProps={{ loop: true }}>
              Notice: This is notice content, if i am too long, i will loop! Is that ok ? my friend!!
          </NoticeBar>
        </section>
      );
    }
  }
  
  
  export default NoticeBarPage;
  