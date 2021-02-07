import React, { Component } from 'react';
import './TodoItem.css';
import classNames from 'classnames';
import checkImg from '../img/check.svg';
import checkCompleteImg from '../img/check-complete.svg';
 

class TodoItem extends Component {
 
    render(){
        const { item,onclick } = this.props;
        let url = item.isComplete === true  ? checkImg : checkCompleteImg;
        return(
            <div className={classNames('TodoItem',{
                TodoDone: item.isComplete
            })}>
                <img  onClick={onclick} src={url} width={32}/>
                <p  >{item.title}</p>
            </div>      
        );
    }
}

export default TodoItem;