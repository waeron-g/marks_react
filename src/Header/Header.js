import React, {Component} from "react"
import logo from '../logo.svg'
import '../App.css';

class Header extends React.Component
{
    render (route)
    {
        let links = {
            "Links" : [{
                "path" : "/students",
                "name" : "Студенты",
                },
                {
                "path" : "/groups",
                "name" : "Группы",
                },
                {
                "path" : "/marks",
                "name" : "Оценки",
                },
                {
                "path" : "/disciplines",
                "name" : "Дисциплины",
                },
            ]
        }
        const items = [];
        
        var class1 = 'active';
        for (const  item of links.Links) {
            if (item.path === window.location.pathname)
            class1 = 'active';
            else
            class1= "";
            items.push(<a href = {item.path} className={class1}>{item.name}</a>);
        }
        return (
            <header class = "main_menu">
            <a href = "/" ><img src= {logo} height="45px"></img></a>
            {items}
            </header>
        )
    }
}



export default Header;