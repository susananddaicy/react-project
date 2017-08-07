import React, {
  Component,
} from 'react';
import ActionSheet from '../../components/ActionSheet';

class ActionSheetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
    };
    this.closeSheet = this.closeSheet.bind(this);
    this.openSheet = this.openSheet.bind(this);
  }

  callback1() {
    alert('操作1');
  }

  callback2() {
    alert('操作2');
  }

  openSheet() {
    console.log('openSheet');
    this.setState({
      isShow: true,
    });
  }

  closeSheet() {
    this.setState({
      isShow: false,
    });
  }

  componentWillMount() {

  }

  render() {

  const data = {
    title: '标题',
    content: [
      { text: '操作1', callback: this.callback1 },
      { text: '操作2', callback: this.callback2 },
    ],
  };
    return (
      <section>
        <div onClick={this.openSheet} style={{textAlign: 'center', fontSize: '1.5rem',padding: '2rem', backgroundColor: '#fff'}}>点我打开ActionSheet</div>
        <ActionSheet isShow={this.state.isShow} data={data} onRequestClose={this.closeSheet}/>
      </section>
    );
  }
}


export default ActionSheetPage;
