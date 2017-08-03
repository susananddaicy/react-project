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
    console.log('callback1');
  }

  callback2() {
    console.log('callback2');
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
    title: 'title',
    content: [
      { text: 'This is content', callback: this.callback1 },
      { text: 'This is also content', callback: this.callback2 },
    ],
  };
    return (
      <section>
        <div onClick={this.openSheet} style={{textAlign: 'center', fontSize: '2rem', color: '#fc7946'}}>点我打开ActionSheet</div>
        <ActionSheet isShow={this.state.isShow} data={data} onRequestClose={this.closeSheet}/>
      </section>
    );
  }
}


export default ActionSheetPage;
