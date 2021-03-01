import React, {Component} from "react"

class Groups extends React.Component
{
    constructor(){
        super();
        this.state={
          result:''
        }
      }
    
    componentDidMount(){
        fetch('https://marks-and-attendance.herokuapp.com/group/getAll')
  .then(response => response.json())
  .then(data => console.log(data));
      } 

    render ()
    {
        console.log(this.state);
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Загрузка...</div>;
        } else {
          return (
            <ul>
              {items.map(item => (
                <li key={item.id}>
                  {item.name} {item.price}
                </li>
              ))}
            </ul>
          );
        }    
    }
}



export default Groups;