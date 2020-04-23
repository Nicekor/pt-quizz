import React, { useState, useEffect, useCallback } from 'react';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';

import classes from './gameMenu.module.css';

const GameMenu = () => {
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');
    const [isTokenLoaded, setIsTokenLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [areCategoriesLoaded, setAreCategoriesLoaded] = useState(false);
    const [difficulties, setDifficulties] = useState([
        'Easy',
        'Medium',
        'Hard',
    ]); // these values are hardcoded because the api doesn't provide these
    const [type, setType] = useState(['multiple', 'boolean']); // hardcoded for the same reason as the difficulties

    const getCategories = useCallback(async () => {
        try {
            const res = await fetch('https://opentdb.com/api_category.php');
            const { trivia_categories } = await res.json();
            setCategories(trivia_categories);
            setAreCategoriesLoaded(true);
        } catch (err) {
            setError(err);
        } finally {
            setAreCategoriesLoaded(true);
        }
    }, []);

    const getToken = useCallback(async () => {
        try {
            const res = await fetch(
                'https://opentdb.com/api_token.php?command=request'
            );
            const { token } = await res.json();
            setToken(token);
        } catch (err) {
            setError(err);
        } finally {
            setIsTokenLoaded(true);
        }
    }, []);

    useEffect(() => {
        getCategories();
        getToken();
    }, [getCategories, getToken]);

    const handleSubmit = () => {};

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!areCategoriesLoaded || !isTokenLoaded) {
        return <Spinner />;
    } else {
        const categoryOptions = categories.map((category) => {
            return <option key={category.id}>{category.name}</option>;
        });
        const difficultiesOptions = difficulties.map((difficulty, i) => {
            return <option key={i}>{difficulty}</option>;
        });

        return (
            <form onSubmit={handleSubmit} className={classes.gameMenu}>
                <div className={classes.line}>
                    <Input
                        labelName="Category:"
                        Component="select"
                        icon={faArrowDown}
                    >
                        {categoryOptions}
                    </Input>
                    <Input
                        labelName="Difficulty:"
                        Component="select"
                        icon={faArrowDown}
                    >
                        {difficultiesOptions}
                    </Input>
                </div>
                <div className={classes.line}>
                    <Input
                        type="number"
                        labelName="Number of Questions:"
                        min="10"
                        max="100"
                    />
                </div>
            </form>
        );
    }
};

export default GameMenu;
