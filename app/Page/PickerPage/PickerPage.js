import React, {Component} from 'react';
import Picker from '../../components/Picker/Picker.js';

class PickerExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerShown: true,
      mainSelect: 0,
      secondarySelect: 0,
      mainColumns: ['项目1', '项目2', '项目3', '项目4', '项目5'],
      secondaryColumns: ['项目11', '项目12', '项目13', '项目14', '项目15', '项目16', '项目17', '项目18'],
    };

    this.mainSelectChange = this.mainSelectChange.bind(this);
    this.secondarySelectChange = this.secondarySelectChange.bind(this);
    this.pickerConfirm = this.pickerConfirm.bind(this);
    this.openPicker = this.openPicker.bind(this);
  }

  mainSelectChange(index) {
    const secondaryColumns = (new Array(5 + index)).fill(0).map((item, ind) => `项目${index + 1}${ind + 1}`);
    this.setState({
      mainSelect: index,
      secondaryColumns,
    });
  }

  secondarySelectChange(index) {
    this.setState({
      secondarySelect: index,
    });
  }

  pickerConfirm() {
    this.setState({
      pickerShown: false,
    });
  }
 
  openPicker() {
    this.setState({
      pickerShown: true,
    });
  }

  render() {
    const {
      mainColumns,
      secondaryColumns,
      pickerShown,
      mainSelect,
      secondarySelect,
    } = this.state;

    const columns = [{
      align: 'center',
      values: mainColumns,
      onItemSelected: this.mainSelectChange,
    }, {
      align: 'center',
      values: secondaryColumns,
      onItemSelected: this.secondarySelectChange,
    }];

    return (
      <div>
        <div onClick={this.openPicker} style={{textAlign: 'center', fontSize: '2rem',marginTop: '2rem'}}>点我打开Picker选择器</div>
        <Picker
          title="Picker选择器"
          shown={pickerShown}
          onCancel={() => this.setState({ pickerShown: false })}
          onConfirm={this.pickerConfirm}
          columns={columns}
        />
        
      </div>
    );
  }
}

export default PickerExample;
