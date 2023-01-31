import React from "react";

import { Navbar, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import PickerComponent from "./PickerComponent";

type HomeProps = {};

type HomeState = {
  names: string[];
  values: number[];
  required: number[];
  predicts: number[];

  summary: number;
};

class Home extends React.Component<HomeProps, HomeState> {
  componentDidMount() {
    this.recalculate();
  }

  constructor(props: HomeProps) {
    super(props);

    this.state = {
      // The whole configuration happens in the "names" and "required" lists
      // It's important to keep all the lists with the same length
      values: [0, 0, 0],
      predicts: [0, 0, 0],
      names: ["12p", "8p", "4p"],
      required: [115, 165, 190],

      summary: 0,
    };
  }

  recalculate = () => {
    this.setState(
      {
        summary: this.state.values
          .map((k, i) => k / this.state.required[i])
          .reduce((a, b) => a + b, 0),
      },
      this.recalculate_predicts
    );
  };

  recalculate_predicts = () => {
    this.setState({
      predicts: this.state.required.map((k, _) =>
        this.state.summary < 1 ? (1 - this.state.summary) * k : 0
      ),
    });
  };

  handleValueUpdate = (index: number, value: number) => {
    const nextValues = this.state.values.map((c, i) => {
      if (i === index) {
        return value;
      } else {
        return c;
      }
    });
    this.setState({ values: nextValues }, this.recalculate);
  };

  render() {
    return (
      <div className="container-fluid">
        <Navbar className="bg-light">
          <Navbar.Brand>Kalkulator Norm</Navbar.Brand>
        </Navbar>
        <Form>
          {this.state.required.map((_, i) => (
            <PickerComponent
              required={this.state.required[i]}
              placeholder_fill={this.state.predicts[i].toString()}
              updateParent={(val) => this.handleValueUpdate(i, val)}
              name={this.state.names[i]}
              key={i}
            />
          ))}
          <Form.Group className="mb-3">
            <Form.Label>Suma procent</Form.Label>
            <Form.Text className="text-muted">
              {this.state.summary * 100}%
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Home;
