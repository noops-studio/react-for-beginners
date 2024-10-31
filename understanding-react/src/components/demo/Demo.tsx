import { useEffect, useRef, useState } from 'react'
import './Demo.css'

function Demo(): JSX.Element {

    const now = useRef<string>((new Date()).toLocaleTimeString())

    const [ currentTime, setCurrentTime ] = useState<string>((new Date()).toLocaleTimeString())

    useEffect(() => {
        // build up
        const intervalId = setInterval(() => {
            console.log('updating clock...')
            setCurrentTime((new Date()).toLocaleTimeString())
        }, 1000)

        // clean up
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const animals = ['dog', 'cat', 'fish']

    function clicked() {
        alert('clicked in function')
    }

    const database = [
        ['nike', 'adidas', 'puma'],
        ['milk', 'bread', 'tomato']
    ]

    const [ products, setProducts ] = useState<string[]>(database[0])

    const [ index, setIndex ] = useState<number>(0)

    useEffect(() => {
        setProducts(database[index])
    }, [index])

    function toggle() {
        setIndex(index === 0 ? 1 : 0)
    }

    return (
        <div className='Demo'>
            <h1>Hello Demo</h1>
            <hr/>
            <h2>Component mounted on {now.current}</h2>
            <hr/>
            <h2>The time is {currentTime}</h2>
            <hr/>
            <h2>animals are</h2>
            <ul>
                {animals.map(animal => <li key={animal}>{animal}</li>)}
            </ul>
            <hr/>
            <button onClick={clicked}>Example</button>
            <hr/>
            <button onClick={toggle}>Toggle</button>
            <ul>
                {products.map(product => <li key={product}>{product}</li>)}
            </ul>
            <hr/>
            <input/>

        </div>
    )    
}

export default Demo