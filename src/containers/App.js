import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll'
import './App.css'

const App = () => {
    const [robotsList, setRobotsList] = useState([]);
    const [displayedRobots, setDisplayedRobots] = useState([]);
    const [searchField, setSearchField] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobotsList(users));
    }, [])

    useEffect(() => {
        const filteredRobots = robotsList.filter(robot =>
            robot.name.toLowerCase().includes(searchField.toLowerCase()))
        setDisplayedRobots(filteredRobots);
    }, [robotsList, searchField])

    const onSearchChange = (event) => {
        setSearchField(event.target.value);
    }

    return (
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <Searchbox searchChange={onSearchChange} />
            <Scroll>
                <CardList robots={displayedRobots} />
            </Scroll>
        </div>
    )
}

export default App;