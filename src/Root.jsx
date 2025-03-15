import { Link } from 'react-router-dom'

export function Root() {
    return (
        <>
            <Link to="/Section1">Section 1</Link>
            <Link to="/Section2">Section 2</Link>
            <Link to="/Section3">Section 3</Link>
        </>
    )
}