import React, { Component } from 'react';
import Accordion from '../../components/Accordion/Accordion.js';
import AccordionHeader from './AccordionHeader/AccordionHeader';
import AccordionItem from './AccordionItem/AccordionItem';
import data from './testData';

const ProductAccordion = Accordion({ AccordionHeader, AccordionItem });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.setState({
      list: data,
    });
  }

  render() {
    return (
      <div>
        <ProductAccordion
          list={this.state.list}
          childField="histories"
          shouldFixHeader
        />
      </div>
    );
  }
}

export default App;
