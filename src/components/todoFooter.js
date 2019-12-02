import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action} from 'mobx';
import {pluralize} from '../utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

@observer
export default class TodoFooter extends React.Component {
	render() {
		const todoStore = this.props.todoStore;
		if (!todoStore.activeTodoCount && !todoStore.completedCount)
			return null;

		const activeTodoWord = pluralize(todoStore.activeTodoCount, 'item');

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{todoStore.activeTodoCount}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
					{this.renderFilterLink(ALL_TODOS, ALL_TODOS, "All")}
					{this.renderFilterLink(ACTIVE_TODOS, ACTIVE_TODOS, "Active")}
					{this.renderFilterLink(COMPLETED_TODOS, COMPLETED_TODOS, "Completed")}
				</ul>
				{ todoStore.completedCount === 0
					? null
					: 	<button
							className="clear-completed"
							onClick={this.clearCompleted}>
							Clear completed
						</button>
				}
			</footer>
		);
	}

	renderFilterLink(filterName, type, caption) {
		return (<li>
			<button onClick={this.setFilter(type)}
				className={filterName ===  this.props.todoStore.todoFilter ? "selected" : ""}>
				{caption}
			</button>
			{' '}
		</li>)
	}

	@action
	clearCompleted = () => {
		this.props.todoStore.clearCompleted();
	};
	@action
	setFilter = (type) => () => {
		console.log(type);
		this.props.todoStore.setFilterType(type);
	}
}

TodoFooter.propTypes = {
	todoStore: PropTypes.object.isRequired
}
