import React, {Component} from 'react';
import PanelInfo from '../../components/PanelInfo/PanelInfo.js';

class PanelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const data = [
      { label: 'label1', text: 'content1' },
      { label: 'label2', text: 'content2' },
      { label: 'label3', text: 'content3' },
    ];
    const panelinfoHtml = <PanelInfo body={data} />;
    return (
      <div style={{padding: '1rem'}}>
        {panelinfoHtml}
      </div>
    );
  }
}

export default PanelPage;
