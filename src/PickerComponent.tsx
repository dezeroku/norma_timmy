import { Form } from "react-bootstrap";
import React from "react";

type PickerComponentState = {
  current: number;
};

type PickerComponentProps = {
  required: number;
  placeholder_fill: string;
  updateParent: (val: number) => void;

  name: string;
};

class PickerComponent extends React.Component<
  PickerComponentProps,
  PickerComponentState
> {
  constructor(props: PickerComponentProps) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  on_update = (value: number) => {
    if (value < 0) {
      value = 0;
    }
    this.setState({
      current: value,
    });
    this.props.updateParent(value);
  };

  render() {
    return (
      <Form.Group className="mb-3">
        <Form.Label>
          {this.props.name} ({this.props.required})
        </Form.Label>
        <Form.Control
          type="number"
          min="0"
          //max="{this.props.required}"
          step="1"
          placeholder={this.props.placeholder_fill}
          value={this.state.current === 0 ? "" : this.state.current}
          onChange={(e) => this.on_update(Number(e.target.value || ""))}
        />
        <Form.Text className="text-muted">
          {(this.state.current / this.props.required) * 100}%
        </Form.Text>
      </Form.Group>
    );
  }
}

export default PickerComponent;
