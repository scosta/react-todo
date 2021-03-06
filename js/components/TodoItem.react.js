var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var classNames = require('classnames');

var TodoItem = React.createClass({
    propTypes: {
        todo: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            isEditing: false
        };
    },

    /**
     * @return {object}
     */
    render: function() {
        var todo = this.props.todo;

        var input;
        if (this.state.isEditing) {
            input =
                <TodoTextInput
                className="edit"
                onSave={this._onSave}
                vlaue={todo.text}
                />;
        }

        // List items should get the class 'editing' when editing
        // and 'completed' when marked as completed.
        // Note that 'completed' is a classification while 'complete' is a state.
        // This differentiation between classification and state becomes important
        // in the naming of view actions toggleComplete() vs. destroyCompleted().
        return (
            <li
            className={classNames({
                'completed': todo.complete,
                'editing': this.state.isEditing
            })}
            key={todo.id}>
                <div className="view">
                    <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.complete}
                    onChange={this._onToggleComplete}
                    />
                    <label onDoubleClick={this._onDoubleClick}>
                        {todo.text}
                    </label>
                    <button className="destroy" onClick={this._onDestroyClick}/>
                </div>
                {input}
            </li>
        );
    },

    _onToggleComplete: function() {
        TodoActions.toggleComplete(this.props.todo);
    },

    _onDoubleClick: function() {
        this.setState({isEditing: true});
    },

    /**
     * Event handler called within TodoTextInput.
     * Defining this here allows TodoTextInput to be used in multiple places
     * in different ways.
     * @param  {string} text
     */
    _onSave: function(text) {
        TodoActions.updateText(this.props.todo.id, text);
        this.setState({isEditing: false});
    },

    _onDestroyClick: function() {
        TodoActions.destroy(this.props.todo.id);
    }
});

module.exports = TodoItem;