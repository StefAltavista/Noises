import { Component } from "react";
export default class Counter extends Component {
    //class constructor
    constructor() {
        super();
        this.state = { count: 0 };
        this.incrementCount = this.incrementCount.bind(this);
    }

    //class methods:
    incrementCount() {
        this.setState({ count: this.state.count + 1 });
        console.log("clicked:", this.state.count);
    }
    render() {
        return (
            <div>
                <h1>The counter</h1>
                <p>current counter: {this.state.count}</p>
                <button onClick={this.incrementCount()}>count</button>
            </div>
        );
    }
}
