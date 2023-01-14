import React from "react";

import { Navbar, Nav, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

type HomeProps = {};

type HomeState = {
  fours: number;
  eights: number;
  twelves: number;
  summary: number;

  requiredFours: number;
  requiredEights: number;
  requiredTwelves: number;

  foursPredict: number;
  eightsPredict: number;
  twelvesPredict: number;
};

class Home extends React.Component<HomeProps, HomeState> {
  componentDidMount() {
    this.recalculate();
  }

  onChange(e: any) {
    console.log(this.state.eights);
    if (e.target.id == "fourPortsField") {
      console.log(e);
      if (e.target.value >= 0) {
        this.setState({ fours: e.target.value }, this.recalculate);
      }
    }

    if (e.target.id == "eightPortsField") {
      console.log(e);
      if (e.target.value >= 0) {
        this.setState({ eights: e.target.value }, this.recalculate);
      }
    }
    if (e.target.id == "twelvePortsField") {
      console.log(e);
      if (e.target.value >= 0) {
        this.setState({ twelves: e.target.value }, this.recalculate);
      }
    }
  }

  recalculate() {
    this.setState(
      {
        summary:
          this.state.fours / this.state.requiredFours +
          this.state.eights / this.state.requiredEights +
          this.state.twelves / this.state.requiredTwelves,
      },
      this.recalculate_predicts
    );
  }

  recalculate_predicts() {
    this.setState({
      twelvesPredict: (1 - this.state.summary) * this.state.requiredTwelves,
      eightsPredict: (1 - this.state.summary) * this.state.requiredEights,
      foursPredict: (1 - this.state.summary) * this.state.requiredFours,
    });
  }

  constructor(props: HomeProps) {
    super(props);

    this.state = {
      fours: 0,
      eights: 0,
      twelves: 0,
      summary: 0,

      requiredFours: 190,
      requiredEights: 165,
      requiredTwelves: 115,

      foursPredict: 0,
      eightsPredict: 0,
      twelvesPredict: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.recalculate = this.recalculate.bind(this);
    this.recalculate_predicts = this.recalculate_predicts.bind(this);
  }

  render() {
    return (
      <div className="container-fluid">
        <Navbar className="bg-light">
          <Navbar.Brand>Kalkulator Norm</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form inline></Form>
          </Navbar.Collapse>
        </Navbar>
        <Form>
          <Form.Group className="mb-3" controlId="twelvePortsField">
            <Form.Label>12p ({this.state.requiredTwelves})</Form.Label>
            <Form.Control
              type="number"
              placeholder={this.state.twelvesPredict.toString()}
              value={this.state.twelves == 0 ? "" : this.state.twelves}
              onChange={this.onChange}
            />
            <Form.Text className="text-muted">
              {(this.state.twelves / this.state.requiredTwelves) * 100}%
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="eightPortsField">
            <Form.Label>8p ({this.state.requiredEights})</Form.Label>
            <Form.Control
              type="number"
              placeholder={this.state.eightsPredict.toString()}
              value={this.state.eights == 0 ? "" : this.state.eights}
              onChange={this.onChange}
            />
            <Form.Text className="text-muted">
              {(this.state.eights / this.state.requiredEights) * 100}%
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fourPortsField">
            <Form.Label>4p ({this.state.requiredFours})</Form.Label>
            <Form.Control
              type="number"
              placeholder={this.state.foursPredict.toString()}
              value={this.state.fours == 0 ? "" : this.state.fours}
              onChange={this.onChange}
            />
            <Form.Text className="text-muted">
              {(this.state.fours / this.state.requiredFours) * 100}%
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="percentageSum">
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
