import React, { Component } from "react";
import Grid from "../template/grid";
import IconButton from "../template/iconButton";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { changeDescription, search, add, clear } from "./todoActions.js";

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandler(e) {
        const { add, search, description, clear } = this.props

        if(e.key === 'Enter') {
            e.shiftKey ? search() : add(description)
        } else if (e.key === 'Escape') {
            clear()
        }
    }

    render() {
        const { add, search, clear, description } = this.props

        return (
            <div role='form' className="todoForm">
                <Grid cols="12 9 10">
                    <input id="description" className="form-control" 
                    placeholder="Adicione uma tarefa" value={description}
                    onKeyUp={this.keyHandler} 
                    onChange={this.props.changeDescription}/>
                </Grid>
                <Grid cols="12 3 2">
                    <IconButton style="primary" icon="plus" onClick={() => add(description)} />
                    <IconButton style="info" icon="search" onClick={() => search()} />
                    <IconButton style="default" icon="close" onClick={() => clear()} />
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        description: state.todo.description
    }
}

function mapDispatchToProp(dispatch) {
    return bindActionCreators({ changeDescription, search, add, clear }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProp)(TodoForm)