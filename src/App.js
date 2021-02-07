
import './App.css';
import React, { Component } from 'react';
import TodoItem from './components/TodoItem';
import tickImg from './img/tick.svg';

class App extends Component{
  constructor(){
    super();
    this.state = {
      newItem: '',
      currentState: 'All', // all active completed
      todoItem: [
        {title : 'Uống nước', isComplete : true},
        {title : 'Hít đất',isComplete : true},
        {title : 'Uống Cafe',isComplete : false},
      ]
    }
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickImgTick = this.onClickImgTick.bind(this);
    this.onClickFilter = this.onClickFilter.bind(this);
 
  }
  // onClickItem(index){
  //   const { todoItem } = this.state;
  //   for(let i = 0 ; i < todoItem.length ; i++ ){
  //         if(index === i){
  //           todoItem[i].isComplete =  !todoItem[i].isComplete;
  //           break;
  //         }
  //   }
  //   this.setState({
  //     todoItem: todoItem
  //   });
     
  // }
  onClickItem(item){
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItem } = this.state;
      const index = todoItem.indexOf(item);
      this.setState({
        todoItem: [
          ...todoItem.slice(0,index),
          {
            ...item,
            'isComplete': !isComplete
          },
          ...todoItem.slice(index + 1)
        ]
      });

    }
  }
  onKeyUp(event){
    if(event.keyCode === 13){ // enter key 
      let text = event.target.value;
     
      if(!text){
        return;
      }
      text = text.trim();
      if(!text){return;}
      this.setState({
        todoItem:  [
          { title: text, isComplete: false },
          ...this.state.todoItem
        ],
        newItem: ''
      })  
    }
  }
  onChange(event){
    this.setState({
      newItem: event.target.value
    })
  }
  onClickImgTick(){
      const { todoItem } = this.state;
      this.setState({
        todoItem: [
            ...todoItem.map((item) => {
                item.isComplete = true
              return item
            })
        ]
      })
  }
  onClickFilter(event){
    console.log(event)
   
    const text = event.target.outerText;  
    this.setState({
      currentState: text
    })
  }
   
 
  render(){
    let { currentState,todoItem,newItem } = this.state;
    if(currentState === "Active"){
       todoItem = todoItem.filter(item => item.isComplete === false)
    }else if(currentState === 'Completed'){
      todoItem = todoItem.filter(item => item.isComplete === true)
    }
 
    return(
      <div className="App">
            <div  className='Header'>
                <img onClick={this.onClickImgTick} src={tickImg} width={32} />
                <input type='text' 
                      placeholder="Add a new Item" 
                      value={newItem}
                      onChange={this.onChange}
                      onKeyUp={this.onKeyUp}/>
            </div>
          
           {
             todoItem.length > 0  && todoItem.map((item,index) =>
            //<TodoItem key={index}  item={item} onclick={() => this.onClickItem(index)}  /> )
            <TodoItem 
                    key={index}  
                    item={item} 
                    onclick={this.onClickItem(item)}  /> )
           }
           {
           todoItem.length === 0 && 'Nothing here'
           }


           <div className="Footer">
                  <button onClick={this.onClickFilter}>All</button>
                  <button onClick={this.onClickFilter}>Active</button>
                  <button onClick={this.onClickFilter}>Completed</button>
           </div>
      </div>
      );
  }
}

 

export default App;
