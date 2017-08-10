import React, {Component} from 'react';
import PanelInfo from '../../components/PanelInfo/PanelInfo.js';
import TimeLine from '../../components/TimeLine/TimeLine.js';
import classNames from 'classNames';
import Mydata from './My.js';
import './MyPage.css';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavClassName: 'nav-pos-init',
      fixName: '基本信息',
    };
    ['onscrollFn'].forEach((method) => {
      this[method] = this[method].bind(this);
    });  
  }

  componentWillMount() {
    document.addEventListener('scroll', this.onscrollFn);
  }

 componentWillUnmount() {
   document.removeEventListener('scroll', this.onscrollFn);
 }

  onscrollFn(ev) {
    const afterScrollTop = document.body.scrollTop;
    let delta = 0;
    if (afterScrollTop >= 0) {
      delta = afterScrollTop - this.beforeScrollTop;
    }
    if (delta === 0) {
      return;
    }
    this.beforeScrollTop = afterScrollTop;
    const navDom = document.getElementsByClassName('MyBrief-Text');
    const client = navDom[0].getBoundingClientRect();
    const navDom1 = document.getElementsByClassName('WorkExprise-Text');  
    const client1 = navDom1[0].getBoundingClientRect();

    if (delta < 0) { // page up
      if (client1.bottom > 0) {
        if (client.bottom < 0) {
          this.setState({
            fixName:  '基本信息',
            showNavClassName: 'nav-pos-active', 
          });
        } else {
          this.setState({
            fixName:  '工作经历', 
            showNavClassName: 'nav-pos-init',
          });
        }
      }
    } else { // page down
      if (client.bottom <= 0) {
        if (client1.bottom <= 0) {
          this.setState({
            fixName:  '工作经历',
            showNavClassName: 'nav-pos-active', 
          });
          } else {
          this.setState({
            fixName:  '基本信息', 
            showNavClassName: 'nav-pos-active',
          });
          }
      }
    }
    ev.preventDefault();
  }


  render() {
    const panelData = [
      { label: '电子邮件', text: Mydata.BaseInfo.email },
      { label: '手机号码', text: Mydata.BaseInfo.phone },
      { label: '行业', text: Mydata.BaseInfo.industry },
      { label: '工作岗位', text: Mydata.BaseInfo.job},    
    ];
    const panelinfoHtml = <PanelInfo body={panelData} hideBottomLine />;

    return (
      <div>
        <section className="MyBrief">
          <p className="MyBrief-Text">基本信息</p> 
          <div className="MyBrief-BaseInfo line-bottom">
            <p className="Name">{Mydata.BaseInfo.name}</p>
            <span className="Job line-right">{Mydata.BaseInfo.job}</span>
            <span className="Company">{Mydata.BaseInfo.company}</span> 
            <p>
              <span className="Sex line-right">{Mydata.BaseInfo.sex}</span>
              <span className="Age line-right">{Mydata.BaseInfo.age}</span> 
              <span className="Address line-right">{Mydata.BaseInfo.address}</span>
              <span className="Years">{Mydata.BaseInfo.workYears}</span>                                  
            </p>         
          </div>
          {panelinfoHtml}
        </section>
        <section className="WorkExprise">
          <p className="WorkExprise-Text">工作经历</p> 
          <TimeLine itemData={Mydata.WorkData} />
        </section>
         <section className="EducationExprise">
          <p className="EducationExprise-Text">教育经历</p> 
          <TimeLine itemData={Mydata.EducationData} />
        </section> 
        <section className="ProjectExprise">
          <p className="ProjectExprise-Text">项目经验</p> 
          <TimeLine itemData={Mydata.ProjectData} />
        </section>        
        <div className={classNames('MyBrief-Text-fix', 'line-bottom', this.state.showNavClassName)}>
          {this.state.fixName}
        </div>              
      </div>
    );
  }
}

export default MyPage;
