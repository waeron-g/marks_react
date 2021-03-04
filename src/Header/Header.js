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
        return (
            <header className = "main_menu">
            <a href = "/" ><img src= {logo} height="90px"></img></a>
            <this.menuElements links = {links} route={window.location.pathname}/>
            </header>
        )
    }

    menuElements (props)
    {
        let items = props.links.Links.map((item) =>{
            let style="";
            if (item.path === props.route)
                style = "active";
        return(
        <a key={item.path} href = {item.path} className={style}>{item.name}</a>);});
        return(
           items
        );
    }
}



export default Header;